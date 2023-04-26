
let tree = false
let deer = {
    x: 20,
    y: 20,
    health: 100,
}

const moveDeerAction = (map) => {
    let paramY = Math.floor(Math.random() * 3) - 1
    if (map[deer.x] !== undefined && map[deer.x][deer.y + paramY] !== undefined && map[deer.x][deer.y + paramY].length === 0) {
        deer.y = deer.y + paramY
    }
    let paramX = Math.floor(Math.random() * 3) - 1
    if (map[deer.x + paramX] !== undefined && map[deer.x + paramX][deer.y] !== undefined && map[deer.x + paramX][deer.y].length === 0) {
        deer.x = deer.x + paramX
    }
}

const moveDeer = (updatedMap) => {
    moveDeerAction(updatedMap)
    updatedMap[deer.x][deer.y] = 'D'
    return updatedMap
}


module.exports.updateAgents = (map) => {
    map[10][10] = tree ? 'A' : 'B'
    map = moveDeer(map)
    return map
}