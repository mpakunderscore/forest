const {generateMap, updateMap} = require("./map/map");
const {getDeer} = require("./units/deer");
const {updateAgents} = require("./map/agents");
const {updateGround} = require("./map/ground");

const initSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('Connected: ' + socket.id);
        socket.emit('map', map)
    })

    initGlobalTimer(io)
}

const initGlobalTimer = (io) => {
    setInterval(() => {
        const map = updateMap()
        io.emit('map', map)
    }, 1000)
}

module.exports = {
    initSocket
}