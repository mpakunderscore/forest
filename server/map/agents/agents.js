const {mapItemDefault} = require("../types")

let units = []

const createUnits = () => {

    for (let i = 0; i < 10; i++) {

        let agent = {...mapItemDefault}
        agent.id = 'deer' + i
        agent.type = 'deer'
        units.push(agent)
    }

    for (let i = 0; i < 10; i++) {

        let agent = {...mapItemDefault}
        agent.id = 'raccoon' + i
        agent.type = 'raccoon'
        units.push(agent)
    }
}

createUnits()

const updateAgent = (map, agent) => {

    let paramX = Math.floor(Math.random() * 3) - 1
    if (checkExistX(map, agent, paramX)) {
        agent.x = agent.x + paramX
    }

    let paramY = Math.floor(Math.random() * 3) - 1
    if (checkExistY(map, agent, paramY)) {
        agent.y = agent.y + paramY
    }

    map[agent.x][agent.y] = {...agent}
}

const checkExistY = (map, agent, paramY) => {
    return (!map[agent.x] || !map[agent.x][agent.y + paramY])
}

const checkExistX = (map, agent, paramX) => {
    return (!map[agent.x + paramX] || !map[agent.x + paramX][agent.y])
}

const moveAgents = (updatedMap) => {
    for (let i = 0; i < units.length; i++) {
        updateAgent(updatedMap, units[i])
    }
    return updatedMap
}


module.exports.updateAgents = (map) => {
    map = moveAgents(map)
    return map
}