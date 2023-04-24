const {getChat} = require("./openai");
// import texts from './texts'
// let {texts} = require('./texts')
// const {news} = require("./news");
let prefix = '/api'

let allTexts = {
    hello: 'What phrase would you like to greet a new user',
    description: 'Please describe yourself as a system to build map of knowledge for this user and you will use different tools for this, very short',
    what: 'What is it all about? In 3 words, literally',
    error: 'Tell user there is an error',
}

let initAPI = async (app) => {

    app.get(prefix + '/text/:type', async (request, response) => {
        let text = allTexts[request.params['type']]
        if (!text)
            text = allTexts.error
        let out = await getChat(text)
        response.json({text: out.replaceAll('.', '')})
    })

    let routes = [];
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            routes.push(r.route.path)
        }
    });

    app.get(prefix, function (request, response) {
        response.json(routes);
    });
}

module.exports = {
    initAPI
}