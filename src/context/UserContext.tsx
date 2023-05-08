import React, {createContext, useEffect, useState} from 'react';
import {createGesture} from "@ionic/react";

// const CELL_SIZE_DEFAULT = 30

// const POSITION_X_DEFAULT = -10
// const POSITION_Y_DEFAULT = -10

export type UserContextType = {
    userItemsIds,
    setUserItemsIds,
    userItems,
    setUserItems,
    selectedItem,
    setSelectedItem
}

type MapItemDefault = {
    id: 0,
    x: 0,
    y: 0,
    type: '',
    level: 1,
    items: [],
    action: () => {},
    user: '',
}

const UserContext = createContext<UserContextType>({} as UserContextType)

const UserContextProvider = ({children}) => {

    const [userItemsIds, setUserItemsIds] = useState([])

    const [userItems, setUserItems] = useState([])

    const [selectedItem, setSelectedItem] = useState(false)

    const context = {
        userItemsIds,
        setUserItemsIds,
        userItems,
        setUserItems,
        selectedItem,
        setSelectedItem,
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