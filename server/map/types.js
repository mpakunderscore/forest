const mapItemDefault = {
    id: 0,

    x: 0,
    y: 0,

    type: '',

    level: 1,
    items: [],

    action: () => {},

    user: '',
}

const getTree = (id) => {
    console.log(id)
    let item = {...mapItemDefault}
    item.id = id
    item.type = 'tree'
    item.level = 1

    if (id < 3) {
        item.user = 'mpakunderscore'
    }

    item.action = () => {}
    return item
}

const itemTypes = {
    tree: {},
    deer: {},
    raccoon: {},
}

module.exports = {getTree, mapItemDefault}