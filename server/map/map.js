const {updateGround} = require("./ground");
const {updateAgents} = require("./agents/agents");
const {generateMap} = require("./generator");

module.exports.updateMap = () => {
    updatedMap = JSON.parse(JSON.stringify(map))
    updatedMap = updateGround(updatedMap)
    updatedMap = updateAgents(updatedMap)
    return updatedMap
}

module.exports.getMap = () => {
    return map
}

let map = generateMap()
let updatedMap = JSON.parse(JSON.stringify(map))

