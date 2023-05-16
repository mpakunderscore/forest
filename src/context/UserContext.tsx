import React, {createContext, useContext, useEffect, useState} from 'react';


export type UserContextType = {
    username,
    setUsername,
    // userItemsIds,
    // setUserItemsIds,
    // userItems,
    // setUserItems,
    selectedItem,
    setSelectedItem,
    isSound,
    setSound,
    setUser
}

const UserContext = createContext<UserContextType>({} as UserContextType)

const UserContextProvider = ({children}) => {

    const [username, setUsername] = useState(localStorage.getItem('username'))

    // const [userItemsIds, setUserItemsIds] = useState([])

    // const [userItems, setUserItems] = useState([])

    const [selectedItem, setSelectedItem] = useState(false)

    const [isSound, setSound] = useState(false)

    const [user, setUser] = useState(localStorage.getItem(('user')))

    const context = {
        username,
        setUsername,
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