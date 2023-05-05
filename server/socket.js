const {getMap} = require("./map/map");

let io

const initSocket = (server) => {

    io = server

    io.on('connection', (socket) => {

        console.log('Connected: ' + socket.id);

        const map = getMap()
        socket.emit('map', {time: 0, map})

        socket.on('seed', (seed) => {
            console.log('Seed: ' + seed);
        })
    })
}

const broadcast = (name, value) => {
    io.emit(name, value)
}

module.exports = {
    initSocket, broadcast
}