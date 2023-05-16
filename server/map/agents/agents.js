const {mapItemDefault} = require("../types")

module.exports.generateUnits = () => {

    let units = []

    for (let i = 0; i < 10; i++) {

        let agent = {...mapItemDefault}
        agent.id = 'deer' + i
        agent.type = 'deer'
        agent.level = 1
        units.push(agent)
    }

    for (let i = 0; i < 10; i++) {

        let agent = {...mapItemDefault}
        agent.id = 'raccoon' + i
        agent.type = 'raccoon'
        agent.level = 2
        units.push(agent)
    }

    return units
}

const updateAgent = (map, agent) => {

    let action = Math.floor(Math.random() * 5) - 1

    if (action >= 1) {

        let paramX = Math.floor(Math.random() * 3) - 1
        if (checkExistX(map, agent, paramX)) {
            agent.x = agent.x + paramX
        }

        let paramY = Math.floor(Math.random() * 3) - 1
        if (checkExistY(map, agent, paramY)) {
            agent.y = agent.y + paramY
        }
    }

    if (!map[agent.x])
        map[agent.x] = {}

    map[agent.x][agent.y] = {...agent}
}

const checkExistX = (map, agent, paramX) => {
    return (!map[agent.x + paramX] || !map[agent.x + paramX][agent.y])
}

const checkExistY = (map, agent, paramY) => {
    return (!map[agent.x] || !map[agent.x][agent.y + paramY])
}

const moveAgents = (updatedMap, units) => {
    for (let i = 0; i < units.length; i++) {
        updateAgent(updatedMap, units[i])
    }
    return updatedMap
}


module.exports.updateAgents = (map, units) => {
    map = moveAgents(map, units)
    return map
}