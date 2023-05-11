import React, {useContext, useEffect, useState} from 'react';
import {App as AppCapacitor} from '@capacitor/app';
import Forest from "./components/Forest";
import {initSocket} from "./utils/socket";
import {MapContextProvider} from "./context/MapContext";
import './css/index.css'
import {UserContext, UserContextProvider} from "./context/UserContext";

function App() {

    const {userItems, setUserItems} = useContext(UserContext)

    const [time, setTime] = useState(0)
    const [map, setMap] = useState([])

    const onMap = (mapObject) => {
        setTime(mapObject.time)
        setMap(mapObject.map)
    }

    const onUser = (userObject) => {
        setUserItems(userItems)
        // setUserItemsIds(userItemsIds)
    }

    useEffect(() => {
        AppCapacitor.addListener('backButton', () => {})
        initSocket(onMap, onUser)
    }, [])

    return (
        <div id={'app'}>
            <MapContextProvider>
                <UserContextProvider>
                    <Forest map={map} time={time}/>
                </UserContextProvider>
            </MapContextProvider>
        </div>
    );
}

export default App;