import React, {useEffect, useState} from 'react';
import {App as AppCapacitor} from '@capacitor/app';
import './css/index.css'
import {Capacitor} from "@capacitor/core";
import {createGesture} from '@ionic/react';
import Forest from "./components/Forest";

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



    useEffect(() => {
        AppCapacitor.addListener('backButton', () => {})
    }, [])

    return (
        <div id={'app'}>
            <Forest/>
        </div>
    );
}

export default App;