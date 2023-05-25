const {mapItemDefault} = require("../types")

const mapTreeDefault = {
    ...mapItemDefault,

    water: 0,
    seeds: [],
    experience: 0,
    leaves: 0,
    growGrass: () => { // 1 leave

        if (this.growGrassPossible()) {
            this.plantGrass()
            this.leaves--
        }

        // somewhere around grass
    },
    growGrassPossible: () => {
        // if there is empty cell around
    },
    plantGrass: () => {
        // plant grass somewhere
    }
}

const mapUnitDefault = {
    ...mapItemDefault,

    health: 100, // if hunger 100 - health go down 1 each 100 sec
    hunger: 0, // will go up each 10 sec. up to 100

    // danger: false,

    memory: [], // item o entity - last friendly unit, tree and water, enemy

    actions: {
        follow: (entity) => {}, // follow selected entity, follow first for kids
        observe: (postAction) => {}, // found something interesting around and add it to memory

        move: (x, y, postAction) => {}, // move to certain direction short way stay x + 1
        eat: () => {}, // eat food around +2 if possible

        searchFood: () => {

        },

        // we have to decide when to go eat or is it time to run
        decide: () => {
            if (this.hunger === 0) {
                let lastTree = this.memory.find(item => item.type === 'tree')[0]

                if (!lastTree)
                    this.searchFood()

                this.action = this.move(lastTree.x, lastTree.y, this.observe(this.eat(this.decide)))
            }

            if (this.hunger < 30) {

            }
            // if (this.danger) {
            //
            // }
        }
    },
    action: () => {},

}

const generateUnit = (index, type) => {
    let agent = {...mapUnitDefault}
    agent.x = 5
    agent.y = 5
    agent.id = type + index
    agent.type = type
    agent.level = 1
    return agent
}

module.exports.generateUnits = () => {

    let units = []

    for (let i = 0; i < 1; i++) {
        const agent = generateUnit(i, 'deer')
        units.push(agent)
    }

    for (let i = 0; i < 1; i++) {
        const agent = generateUnit(i, 'raccoon')
        units.push(agent)
    }

    return units
}

const updateAgent = (map, agent) => {

    let action = Math.floor(Math.random() * 5) - 1

    if (action >= 1) {

        let paramX = Math.floor(Math.random() * 3) - 1
        if (checkExistX(map, agent, paramX)) {
            agent.x = agent.x + paramX
        }

        let paramY = Math.floor(Math.random() * 3) - 1
        if (checkExistY(map, agent, paramY)) {
            agent.y = agent.y + paramY
        }
    }

    if (!map[agent.x])
        map[agent.x] = {}

    map[agent.x][agent.y] = {...agent}
}

const checkExistX = (map, agent, paramX) => {
    // console.log('exist')
    return (!map[agent.x + paramX] || !map[agent.x + paramX].id || !map[agent.x + paramX][agent.y].id)
        && (agent.x + paramX < 10)
        && (agent.x + paramX > 0)
}

const checkExistY = (map, agent, paramY) => {
    // console.log('exist')
    return (!map[agent.x] || !map[agent.x].id || !map[agent.x][agent.y + paramY].id)
        && (agent.y + paramY < 10)
        && (agent.y + paramY > 0)
}

const moveAgents = (updatedMap, units) => {
    for (let i = 0; i < units.length; i++) {
        updateAgent(updatedMap, units[i])
    }
    return updatedMap
}


module.exports.updateAgents = (map, units) => {
    map = moveAgents(map, units)
    return map
}