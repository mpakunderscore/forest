const {generateMap} = require("./map");

const map = generateMap()

const initSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('Connected: ' + socket.id);
        socket.emit('map', map)
    })
}

module.exports = {
    initSocket
}