import React, {useEffect, useState} from 'react';
import {App as AppCapacitor} from '@capacitor/app';
import Forest from "./components/Forest";
import {initSocket} from "./utils/socket";
import './css/index.css'

function App() {

    const [time, setTime] = useState(0)
    const [map, setMap] = useState([])

    const onMap = (mapObject) => {
        setTime(mapObject.time)
        setMap(mapObject.map)
    }

    useEffect(() => {
        AppCapacitor.addListener('backButton', () => {})
        initSocket(onMap)
    }, [])

    return (
        <div id={'app'}>
            <Forest map={map} time={time} />
        </div>
    );
}

export default App;