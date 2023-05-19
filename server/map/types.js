const EntityTypes =
    'tree' | 'shrubs' | 'grass' |
    'stone' | 'water' |
    'deer' | 'raccoon' |
    'head'

const mapItemDefault = {
    id: 0,
    x: 0,
    y: 0,
    type: '',
    level: 1,
    items: [],
    user: '',
}

const itemTypes = {
    tree: {},
    deer: {},
    raccoon: {},
}

module.exports = {mapItemDefault}