const {getMap} = require("./map/map");

let io

const initSocket = (server) => {

    io = server

    io.on('connection', (socket) => {

        console.log('Connected: ' + socket.id)

        socket.on('username', (username) => {

            // console.log(map)

            const map = getMap()
            socket.emit('map', {time: 0, map})
            socket.emit('user', {username, userItems: [map[1][1], map[3][3]]})
        })

        socket.on('seed', (seed) => {
            setSeed(seed)
        })
    })
}

const broadcast = (name, value) => {
    io.emit(name, value)
}

const setSeed = (seed) => {
    console.log('Seed: ' + seed);
}

module.exports = {
    initSocket, broadcast
}