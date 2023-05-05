const mapItemDefault = {
    x: 0,
    y: 0,

    name: '',
    type: '',

    level: 1,
    items: [],

    user: '',
}

const itemTypes = {
    tree: {
        oak: {},
        maple: {},
        pine: {}
    },
    stone: {

    }
}

const unitTypes = {
    animal: {
        deer: {

        }
    },
    robot: {
        assembler: {

        }
    }
}

module.exports = {itemTypes, unitTypes, mapItemDefault}