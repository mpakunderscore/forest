import React, {useEffect, useState} from 'react';
import {App as AppCapacitor} from '@capacitor/app';
import './css/index.css'
import {Capacitor} from "@capacitor/core";
import {createGesture} from '@ionic/react';
import Forest from "./components/Forest";
import { io } from 'socket.io-client';


console.log(navigator.language)
// console.warn(navigator.userAgent)

function iOS() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

// console.log(Capacitor.getPlatform())

declare var VERSION: string;
console.log(VERSION)

function App() {

    const [map, setMap] = useState([])

    const initSocket = () => {
        const socket = io('/')
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('map', map => onMap(map))
    }

    const onConnect = () => {
        console.log('Connect')
    }
    const onDisconnect = () => {
        console.log('Disconnect')
    }

    const onMap = (map) => {
        console.log('Map')
        setMap(map)
    }

    useEffect(() => {
        AppCapacitor.addListener('backButton', () => {})
        initSocket()
    }, [])

    return (
        <div id={'app'}>
            <Forest map={map}/>
        </div>
    );
}

export default App;