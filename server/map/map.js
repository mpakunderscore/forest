const {updateGround} = require("./ground");
const {updateAgents, generateUnits} = require("./agents/agents");
const {generateMap} = require("./generator");

module.exports.updateMap = () => {
    updatedMap = JSON.parse(JSON.stringify(map))
    updatedMap = updateGround(updatedMap)
    updatedMap = updateAgents(updatedMap, units)
    return updatedMap
}

module.exports.getMap = () => {
    // console.log(map)
    return map
}

let map = generateMap()
let units = generateUnits()
let updatedMap = JSON.parse(JSON.stringify(map))

