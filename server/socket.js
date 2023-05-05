const {updateMap, getMap} = require("./map/map");
const {getTimeCount} = require("./timer");

let io

const initSocket = (server) => {

    io = server

    io.on('connection', (socket) => {

        console.log('Connected: ' + socket.id);
        const map = getMap()
        socket.emit('map', {time: getTimeCount(), map})

        socket.on('seed', (seed) => {
            console.log('Seed: ' + seed);
        })
    })
}

const broadcast = (name, value) => {
    io.emit(name, value)
}

const broadcastNames = {

}


module.exports = {
    initSocket, broadcast
}