const {mapItemDefault} = require("./types");

const DEFAULT_MAP_WIDTH = 200
const DEFAULT_MAP_HEIGHT = 200
const generateMap = () => {

    let generatedMap = {}

    for (let i = 0; i < DEFAULT_MAP_WIDTH; i++) {

        generatedMap[i] = {}
        for (let j = 0; j < DEFAULT_MAP_HEIGHT; j++) {

            let random = Math.random() * 1000;

            // TODO Empty
            // generatedMap[i][j] = {empty: true}

            if (random >= 900) {

                generatedMap[i][j] = {...mapItemDefault}
                generatedMap[i][j].type = 'tree'
                generatedMap[i][j].name = 'pine'
                generatedMap[i][j].level = 1

                if (random > 950) {
                    generatedMap[i][j].level = 2
                }
            }
        }
    }

    console.log('Load map')
    return generatedMap
}

module.exports = {generateMap}