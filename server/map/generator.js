const {mapItemDefault, getTree} = require("./types");

const DEFAULT_MAP_WIDTH = 10
const DEFAULT_MAP_HEIGHT = 10

let entityCount = 0

const generateMap = () => {

    let generatedMap = {}

    for (let i = -DEFAULT_MAP_WIDTH; i < DEFAULT_MAP_WIDTH; i++) {
        generatedMap[i] = {}
        for (let j = -DEFAULT_MAP_HEIGHT; j < DEFAULT_MAP_HEIGHT; j++) {

            let random = Math.random() * 1000;

            // TODO Empty
            // generatedMap[i][j] = {empty: true}

            const noNear = () => {
                return !generatedMap[i-1] || (!generatedMap[i][j-1] && !generatedMap[i-1][j])
            }

            if (random >= 900 && noNear()) {
                generatedMap[i][j] = getTree(entityCount++, i, j, 1)
                generatedMap[i][j].x = i
                generatedMap[i][j].y = j
                if (random > 950) {
                    generatedMap[i][j].level = 2
                }
                if (random > 970) {
                    generatedMap[i][j].level = 3
                }
                if (random > 990) {
                    generatedMap[i][j].level = 4
                }
                if (random > 995) {
                    generatedMap[i][j].level = 5
                }
            }
        }
    }

    generatedMap[1][1] = getTree(entityCount++, 1, 1, 7, 'test')
    generatedMap[3][3] = getTree(entityCount++, 3, 3, 3, 'test')

    generatedMap[-10][7] = getEntity(entityCount++, -20, 7, 106, 'test', 'head')

    console.log('Load map')
    return generatedMap
}

const getEntity = (id, x, y, level, user, type) => {
    let entity = {...mapItemDefault}
    entity.id = id
    entity.level = level
    entity.x = x
    entity.y = y
    entity.type = type
    return entity
}

module.exports = {generateMap}