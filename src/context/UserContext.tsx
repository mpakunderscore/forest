import React, {createContext, useContext, useEffect, useState} from 'react';
import {createGesture} from "@ionic/react";
import {MapContext} from "./MapContext";

// const CELL_SIZE_DEFAULT = 30

// const POSITION_X_DEFAULT = -10
// const POSITION_Y_DEFAULT = -10

export type UserContextType = {
    userItemsIds,
    setUserItemsIds,
    userItems,
    setUserItems,
    selectedItem,
    setSelectedItem,
    isSound,
    setSound,
    setUser
}

const UserContext = createContext<UserContextType>({} as UserContextType)

const UserContextProvider = ({children}) => {

    const [userItemsIds, setUserItemsIds] = useState([])

    const [userItems, setUserItems] = useState([])

    const [selectedItem, setSelectedItem] = useState(false)

    const [isSound, setSound] = useState(false)

    const [user, setUser] = useState(localStorage.getItem(('user')))

    const context = {
        userItemsIds,
        setUserItemsIds,
        userItems,
        setUserItems,
        selectedItem,
        setSelectedItem,
        isSound,
        setSound,
        setUser
    }

    useEffect(() => {
    }, [])

    // console.log('context')

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}