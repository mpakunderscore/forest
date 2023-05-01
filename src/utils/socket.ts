import {io} from "socket.io-client";
import {log} from "./log";

let socket

export const initSocket = (onMap) => {
    socket = io('/')
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('map', map => onMap(map))
    // setSocket(socket)
}

const onConnect = () => {
    console.log('Connect')
}
const onDisconnect = () => {
    console.log('Disconnect')
}

const sendSeed = (seedObject) => {
    log('sendSeed')
    socket.emit('seed', seedObject)
}

export const socketAPI = {
    sendSeed
}