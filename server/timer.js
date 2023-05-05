const {updateMap} = require("./map/map")
const {emitSocket} = require("./socket");

let timeCount = 0

const initTimer = (io) => {

    setInterval(() => {

        timeCount++
        const map = updateMap()
        emitSocket('map', {time: timeCount, map})

    }, 1000)
}

const getTimeCount = () => {
    return timeCount
}

module.exports = {
    getTimeCount, initTimer
}