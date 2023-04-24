let { Configuration, OpenAIApi } = require("openai")

// https://platform.openai.com/docs/api-reference/chat

require('dotenv').config({ path: '../.env' });

let organisation = process.env.ORGANISATION
let key = process.env.OPENAI_KEY

const configuration = new Configuration({
    organization: organisation,
    apiKey: key,
})

let getEngines = async () => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.listEngines();
    console.log(response.data)
}

// getEngines()

let getText = async (text) => {
    const openai = new OpenAIApi(configuration);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
        });
        return completion.data.choices[0].text;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

let getChat = async (text) => {
    const openai = new OpenAIApi(configuration);
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0301",
            messages: [{"role": "user", "content": text}]
        });
        return completion.data.choices[0].message.content;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

// Generated images can have a size of 256x256, 512x512, or 1024x1024 pixels
let getImage = async (name) => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        "prompt": name,
        "n": 1,
        "size": "256x256"
    })
    console.log(response.data.data[0])
    // console.log(response.data.choices[0].message.content)
}

getImage('texture for ground in forest plant color')

module.exports = {
    getText, getChat, getImage
}