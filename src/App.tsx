import React, {useCallback, useContext, useEffect, useState} from 'react';
import {App as AppCapacitor} from '@capacitor/app';
import Forest from "./components/Forest";
import {initSocket} from "./utils/socket";
import {MapContextProvider} from "./context/MapContext";
import './css/index.css'
import {UserContext, UserContextProvider} from "./context/UserContext";
import {User, Map} from "./types";
import Red from "./components/Red";

function App() {

    const [user, setUser] = useState<User>({userItems: []})
    const [time, setTime] = useState<number>(0)
    const [map, setMap] = useState<Map>([])
    const [mapItems, setMapItems] = useState<Map>([])

    const onMap = (mapObject) => {

        setTime(mapObject.time)
        setMap(mapObject.map)

        // console.log(mapObject.time)
    }

    const onUpdate = useCallback((mapObject) => {

        // let newMap = {}
        //
        // for (const [i, valueArray] of Object.entries(mapObject.map)) {
        //     for (const [j, value] of Object.entries(mapObject.map[i])) {
        //
        //         if (!newMap[i])
        //             newMap[i] = {}
        //
        //         newMap[i][j] = mapObject.map[i][j]
        //     }
        // }

        setTime(mapObject.time)
        setMapItems(mapObject.map)

    }, [map])

    const onUser = (userObject) => {
        setUser(userObject)
    }

    useEffect(() => {
        AppCapacitor.addListener('backButton', () => {})
        initSocket(onMap, onUpdate, onUser)
    }, [])

    return (
        <div id={'app'}>
            <MapContextProvider>
                <UserContextProvider>
                    {/*<Forest map={map} time={time} user={user}/>*/}
                    <Red map={map} time={time} user={user}/>
                </UserContextProvider>
            </MapContextProvider>
        </div>
    );
}

export default App;