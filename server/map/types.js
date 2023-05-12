const mapItemDefault = {
    id: 0,
    x: 0,
    y: 0,
    type: '',
    level: 1,
    items: [],
    user: '',
}

const getTree = (id, i, j) => {
    console.log(id)
    let item = {...mapItemDefault}
    item.id = id
    item.type = 'tree'
    item.level = 1
    item.x = i
    item.y = j

    // if (i < 5 && i > 0 && j < 5 && j > 0) {
    //     item.user = 'mpakunderscore'
    // }

    item.action = () => {}
    return item
}

const itemTypes = {
    tree: {},
    deer: {},
    raccoon: {},
}

module.exports = {getTree, mapItemDefault}