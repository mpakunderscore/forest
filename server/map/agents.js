const {mapItemDefault} = require("./map");

let deer = {
    x: 20,
    y: 20,
    health: 100,
}

let raccoon = {
    x: 30,
    y: 30,
    health: 100,
}

const moveDeerAction = (map) => {
    let paramY = Math.floor(Math.random() * 3) - 1
    if (map[deer.x] !== undefined && map[deer.x][deer.y + paramY] !== undefined && map[deer.x][deer.y + paramY].empty) {
        deer.y = deer.y + paramY
    }
    let paramX = Math.floor(Math.random() * 3) - 1
    if (map[deer.x + paramX] !== undefined && map[deer.x + paramX][deer.y] !== undefined && map[deer.x + paramX][deer.y].empty) {
        deer.x = deer.x + paramX
    }
}

const moveRaccoonAction = (map) => {
    let paramY = Math.floor(Math.random() * 3) - 1
    if (checkExistY(map, raccoon, paramY)) {
        raccoon.y = raccoon.y + paramY
    }
    let paramX = Math.floor(Math.random() * 3) - 1
    if (checkExistX(map, raccoon, paramX)) {
        raccoon.x = raccoon.x + paramX
    }
}

const checkExistY = (map, agent, paramY) => {
    if (map[agent.x] !== undefined && map[agent.x][agent.y + paramY] !== undefined && map[agent.x][agent.y + paramY].empty)
        return true
    else return false
}

const checkExistX = (map, agent, paramX) => {
    if (map[agent.x + paramX] !== undefined && map[agent.x + paramX][agent.y] !== undefined && map[agent.x + paramX][agent.y].empty)
        return true
    else return false
}

const moveAgents = (updatedMap) => {
    moveDeerAction(updatedMap)
    moveRaccoonAction(updatedMap)
    updatedMap[deer.x][deer.y] = {...mapItemDefault, type: 'D'}
    updatedMap[raccoon.x][raccoon.y] = {...mapItemDefault, type: 'R'}
    return updatedMap
}


module.exports.updateAgents = (map) => {
    map = moveAgents(map)
    return map
}