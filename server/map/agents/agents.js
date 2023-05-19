const {mapItemDefault} = require("../types")

const mapTreeDefault = {
    ...mapItemDefault,

    experience: 0,
    grass: [{id: '', type: 'grass'}],

    // Each tree produce grass (1 for 1 level) and 1 xp
    // Grass production lead to gain experience 2:10 3:20 4:40 5:80 6:160 7:320
    // Once it reach level 5, it starts to produce seeds

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

module.exports.generateUnits = () => {

    let units = []

    for (let i = 0; i < 1; i++) {

        let agent = {...mapUnitDefault}
        agent.id = 'deer' + i
        agent.type = 'deer'
        agent.level = 1



        units.push(agent)
    }

    for (let i = 0; i < 1; i++) {

        let agent = {...mapUnitDefault}
        agent.id = 'raccoon' + i
        agent.type = 'raccoon'
        agent.level = 2
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
    return (!map[agent.x + paramX] || !map[agent.x + paramX][agent.y])
}

const checkExistY = (map, agent, paramY) => {
    return (!map[agent.x] || !map[agent.x][agent.y + paramY])
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