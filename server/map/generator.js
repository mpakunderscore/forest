const {mapItemDefault, getTree} = require("./types");

const DEFAULT_MAP_WIDTH = 200
const DEFAULT_MAP_HEIGHT = 200

let treesCount = 0
const generateMap = () => {

    let generatedMap = {}

    for (let i = -DEFAULT_MAP_WIDTH; i < DEFAULT_MAP_WIDTH; i++) {
        generatedMap[i] = {}
        for (let j = -DEFAULT_MAP_HEIGHT; j < DEFAULT_MAP_HEIGHT; j++) {

            let random = Math.random() * 1000;

            // TODO Empty
            // generatedMap[i][j] = {empty: true}

            if (random >= 900) {
                generatedMap[i][j] = getTree(treesCount++, i, j)
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

    console.log('Load map')
    return generatedMap
}

module.exports = {generateMap}