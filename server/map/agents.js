const {mapItemDefault} = require("./types");
let deer = {
    x: 20,
    y: 20,
}

let raccoon = {
    x: 30,
    y: 30,
}

const moveDeerAction = (map) => {
    let paramY = Math.floor(Math.random() * 3) - 1
    if (checkExistY(map, deer, paramY)) {
        deer.y = deer.y + paramY
    }
    let paramX = Math.floor(Math.random() * 3) - 1
    if (checkExistX(map, deer, paramX)) {
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
    return !map[agent.x][agent.y + paramY]
}

const checkExistX = (map, agent, paramX) => {
    return !map[agent.x + paramX][agent.y]
}

const moveAgents = (updatedMap) => {
    moveDeerAction(updatedMap)
    moveRaccoonAction(updatedMap)
    updatedMap[deer.x][deer.y] = {...mapItemDefault, type: 'animal', name: 'deer', level: 1}
    updatedMap[raccoon.x][raccoon.y] = {...mapItemDefault, type: 'animal', name: 'raccoon', level: 1}
    return updatedMap
}


module.exports.updateAgents = (map) => {
    map = moveAgents(map)
    return map
}