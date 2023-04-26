let tree = false

module.exports.updateGround = (map) => {
    map[10][10] = tree ? 'A' : 'B'
    return map
}