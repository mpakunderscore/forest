const {generateMap} = require("./map");

let map = generateMap()

const initSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('Connected: ' + socket.id);
        socket.emit('map', map)
    })

    initGlobalTimer(io)
}

let tree = false

const initGlobalTimer = (io) => {
    setInterval(() => {
        map[10, 10] = tree ? 'A' : 'B'
        tree = !tree
        io.emit('map', map)
    }, 1000)

}

module.exports = {
    initSocket
}