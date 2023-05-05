const {getChat} = require("./openai");
const {getMap} = require("./map/map");
let prefix = '/api'

let initAPI = async (app) => {

    app.get(prefix + '/map', async (request, response) => {
        let map = getMap()
        response.json({map})
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