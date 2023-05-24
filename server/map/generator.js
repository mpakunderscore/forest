const {mapItemDefault} = require("./types")
// const {createNoise2D} = require('simplex-noise')
// const noise2D = createNoise2D();


const limit = 10

const DEFAULT_MAP_WIDTH = limit
const DEFAULT_MAP_HEIGHT = limit

let entityCount = 1

const MapGenerator = require('worldmap-generator');


const generateMap2 = (width = DEFAULT_MAP_WIDTH, height = DEFAULT_MAP_HEIGHT) => {

    const world = new MapGenerator({
        size: {
            width,
            height
        },
        tileTypes: [
            {
                name: 'grass',  // tile name
                connections: {'grass': 500, 'forest': 1, 'mountain': 1, 'sand': 1}  // connections to surrounding tiles with its frequencies
                // frequency is used for calculating probabillity of appearence next to this tile
            },
            {
                name: 'forest',
                connections: {'grass': 1, 'forest': 300}
            },
            {
                name: 'mountain',
                connections: {'grass': 1, 'mountain': 150}
            },
            {
                name: 'water',
                connections: {'water': 500, 'sand': 1}
            },
            {
                name: 'sand',
                connections: {'grass': 1, 'water': 1, 'sand': 50}
            }
        ]
    });

    world.generate();

    // console.log(world)

    let map = []

    for (let i = 0; i < DEFAULT_MAP_WIDTH; i++) {
        map[i] = {}
        for (let j = 0; j < DEFAULT_MAP_HEIGHT; j++) {
            let type = world.map[i][j].name
            map[i][j] = {type}
        }
    }

    map[1][1] = getTree(entityCount++, 1, 1, 7, 'test')
    map[3][3] = getTree(entityCount++, 3, 3, 3, 'test')

    return map;
}

// generateMap2()

const generateMap = () => {

    let generatedMap = {}

    for (let i = -DEFAULT_MAP_WIDTH; i < DEFAULT_MAP_WIDTH; i++) {
        generatedMap[i] = {}
        for (let j = -DEFAULT_MAP_HEIGHT; j < DEFAULT_MAP_HEIGHT; j++) {

            let random = Math.random() * 1000;

            // TODO Empty
            // generatedMap[i][j] = {empty: true}

            const noNear = () => {
                return !generatedMap[i - 1] || (!generatedMap[i][j - 1] && !generatedMap[i - 1][j] && !generatedMap[i - 1][j - 1])
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
    // generatedMap[7][3] = getTree(entityCount++, 7, 3, 3, 'test')

    // generatedMap[-15][7] = getEntity(entityCount++, -15, 7, 106, 'test', 'head')

    // generatedMap[-9][-9] = getWater(-9, -9)

    console.log('Load map')
    return generatedMap
}

const getTree = (id, i, j, level, user = '') => {
    console.log(id)
    let item = {...mapItemDefault}
    item.id = id
    item.type = 'tree'
    item.name = 'tree'
    item.level = level
    item.user = user
    item.x = i
    item.y = j

    // if (i < 5 && i > 0 && j < 5 && j > 0) {
    //     item.user = 'mpakunderscore'
    // }

    item.action = () => {
    }
    return item
}

const getWater = (x, y) => {
    let item = {...mapUnitDefault}
    // entity.id = id
    // entity.level = level
    item.x = x
    item.y = y
    item.type = 'water'
    return item
}

const mapUnitDefault = {
    ...mapItemDefault,
    memory: [], // remember last friend unit, tree and water
}

const getEntity = (id, x, y, level, user, type) => {
    let entity = {...mapUnitDefault}
    entity.id = id
    entity.level = level
    entity.x = x
    entity.y = y
    entity.type = type
    return entity
}


module.exports = {generateMap: generateMap2}