const {generateMap} = require("./map");

const map = generateMap()
let updatedMap = [...map]

const initSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('Connected: ' + socket.id);
        socket.emit('map', map)
    })

    initGlobalTimer(io)
}

let tree = false
let deer = {
    x: 20,
    y: 20
}

let mapWithUnits
const updateMap = (map) => {
    updatedMap = JSON.parse(JSON.stringify(map))
    updatedMap[10][10] = tree ? 'A' : 'B'
    updatedMap = moveDeer(updatedMap)
    tree = !tree
    return updatedMap
}

const moveDeer = (updatedMap) => {

    if (tree)
        deer.x = deer.x - 1
    else
        deer.y = deer.y - 1

    updatedMap[deer.x][deer.y] = 'D'

    return updatedMap
}

const initGlobalTimer = (io) => {
    setInterval(() => {
        const updatedMap = updateMap(map)
        io.emit('map', updatedMap)
    }, 1000)

}

module.exports = {
    initSocket
}