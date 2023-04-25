let mapWidth = 200;
let mapHeight = 200;

let possibleGreen = 'ABC';
let possibleTrees = 'XYZ';

module.exports.generateMap = () => {

    let generatedMap = []

    for (let i = 0; i < mapWidth; i++) {

        generatedMap[i] = [mapHeight];
        for (let j = 0; j < mapHeight; j++) {

            let random = Math.random() * 1000;
            generatedMap[i][j] = '';

            if (random >= 995)
                generatedMap[i][j] = possibleTrees.charAt(Math.floor(Math.random() * possibleTrees.length));
            else if (random > 950)
                generatedMap[i][j] = possibleGreen.charAt(Math.floor(Math.random() * possibleGreen.length));
        }
    }

    console.log('Load map')

    return generatedMap
}