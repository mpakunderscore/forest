const {mapDiff} = require("./server/map/map");
const {broadcast} = require("./server/socket");

const {initAPI} = require("./server/api");
const {initSocket} = require("./server/socket");
const {initDatabase} = require('./server/database/database')
const {initTimer} = require('./server/timer')

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

// initAPI(app)
// initSocket(io)
// initDatabase()

initTimer((time) => {
    // const mapUpdate = mapDiff()
    // TODO here we need only update over map, not the whole object
    // broadcast('update', {time, map: mapUpdate})
})

// google.readGoogleTable().then(r => {})

app.use('/', express.static(path.join(__dirname, 'dist')))

console.log('Port: ' + port)