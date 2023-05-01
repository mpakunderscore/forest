const {updateMap, getMap} = require("./map/map");

let timeCount = 0

const initSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('Connected: ' + socket.id);
        const map = getMap()
        socket.emit('map', {time: timeCount, map})
    })

    io.on('seed', (seed) => {
        console.log('Seed: ' + seed);
    })

    initGlobalTimer(io)
}

const initGlobalTimer = (io) => {
    setInterval(() => {
        timeCount++
        const map = updateMap()
        io.emit('map', {time: timeCount, map})
    }, 1000)
}

module.exports = {
    initSocket
}