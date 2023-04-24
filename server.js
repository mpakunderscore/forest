let express = require('express')
let path = require('path')
const {getChat} = require("./server/openai");
// const google = require("./server/google");
let app = express()
const cors = require('cors')
const {initAPI} = require("./server/api");

app.use(express.json())
app.use(cors())

let server = require('http').Server(app)
const port = process.env.PORT || 5000
server.listen(port)

require('dotenv').config()

initAPI(app).then()

// google.readGoogleTable().then(r => {})

app.use('/', express.static(path.join(__dirname, 'dist')))

console.log('Port: ' + port)