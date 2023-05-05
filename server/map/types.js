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

const getTree = () => {
    let item = {...mapItemDefault}
    item.type = 'tree'
    item.level = 1
    item.action = () => {}
    return item
}

const itemTypes = {
    tree: {},
    deer: {},
    raccoon: {},
}

module.exports = {getTree, mapItemDefault}