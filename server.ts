const {initAPI} = require("./server/api");
const {initSocket} = require("./server/socket");
const {getChat} = require("./server/openai");

const { Server } = require('socket.io')
const path = require('path')
const cors = require('cors')

const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())

const http = require('http')
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 5000
server.listen(port)

require('dotenv').config()

initAPI(app).then()
initSocket(io)

// google.readGoogleTable().then(r => {})

app.use('/', express.static(path.join(__dirname, 'dist')))

console.log('Port: ' + port)