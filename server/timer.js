const {updateMap} = require("./map/map")
const {broadcast} = require("./socket");

let timeCount = 0

const initTimer = () => {

    setInterval(() => {

        timeCount++
        const map = updateMap()
        broadcast('map', {time: timeCount, map})

    }, 1000)
}

const getTimeCount = () => {
    return timeCount
}

module.exports = {
    getTimeCount, initTimer
}