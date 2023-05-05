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
            generatedMap[i][j] = {empty: true}

            if (random >= 995) {
                generatedMap[i][j] = {...mapItemDefault}
                // generatedMap[i][j].type = possibleTrees.charAt(Math.floor(Math.random() * possibleTrees.length));
            } else if (random > 950) {
                generatedMap[i][j] = {...mapItemDefault}
                // generatedMap[i][j].type = possibleGreen.charAt(Math.floor(Math.random() * possibleGreen.length));
            }
        }
    }

    console.log('Load map')
    return generatedMap
}

module.exports = {generateMap}