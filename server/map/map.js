const {updateGround} = require("./ground");
const {updateAgents, generateUnits} = require("./agents/agents");
const {generateMap} = require("./generator");

const updateMap = () => {
    updatedMap = JSON.parse(JSON.stringify(map))
    updatedMap = updateGround(updatedMap)
    updatedMap = updateAgents(updatedMap, units)
    return updatedMap
}

function arrayDifference(oldMap, map) {

    let diff = {}
    for (let i = 0; i < oldMap.length; i++) {
        diff[i] = {}
        for (let j = 0; j < oldMap.length; j++) {

            console.log(map[i][j].id)

            if (oldMap[i][j].id !== map[i][j].id)
                diff[i][j] = map[i][j]
        }
    }

    return diff
}

module.exports.mapDiff = () => {
    const oldMap = JSON.parse(JSON.stringify(map))
    map = updateMap()

    // console.log(map)

    // return arrayDifference(oldMap, map)
    return map
}

module.exports.getMap = () => {
    // console.log(map)
    return map
}

let map = generateMap()
let units = generateUnits()
let updatedMap = JSON.parse(JSON.stringify(map))

