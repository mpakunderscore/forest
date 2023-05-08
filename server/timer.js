const {updateMap} = require("./map/map")
const {broadcast} = require("./socket");

const TIMER_INTERVAL = 1000

let timeCount = 0

const initTimer = (event) => {

    setInterval(() => {

        timeCount++
        event(timeCount)

    }, TIMER_INTERVAL)
}

const getTimeCount = () => {
    return timeCount
}

module.exports = {
    getTimeCount, initTimer
}