const {mapItemDefault, getTree} = require("./types");

const DEFAULT_MAP_WIDTH = 20
const DEFAULT_MAP_HEIGHT = 20

let treesCount = 0

const noNear = () => {

}
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

    generatedMap[1][1] = getTree(treesCount++, 1, 1)
    generatedMap[1][1].user = 'test'
    generatedMap[1][1].level = 7
    generatedMap[3][3] = getTree(treesCount++, 3, 3)
    generatedMap[3][3].user = 'test'
    generatedMap[3][3].level = 3

    console.log('Load map')
    return generatedMap
}

module.exports = {generateMap}