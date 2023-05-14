import React, {useContext, useEffect} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const Entity = (props) => {

    const userItems = props.user.userItems
    const userItemsIds = userItems.map(item => item.id)

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {centerView, centerViewAuto, currentPositionX, currentPositionY} = useContext(MapContext)

    const item = selectedItem

    useEffect(() => {

    }, [selectedItem, currentPositionX, currentPositionY])

    // console.log(item)

    const next = () => {
        let nextIndex = userItemsIds.indexOf(selectedItem.id) + 1
        if (!userItems[nextIndex]) {
            nextIndex = 0
        }
        setSelectedItem(userItems[nextIndex])
        // centerView(userItems[nextIndex])
    }

    const prev = () => {
        let nextIndex = userItemsIds.indexOf(selectedItem.id) - 1
        if (!userItems[nextIndex]) {
            nextIndex = userItemsIds.length - 1
        }
        setSelectedItem(userItems[nextIndex])
        // centerView(userItems[nextIndex])
    }

    return (
        <div className={'entity'} onClick={() => {
        }}>

            <div className={'center button'} onClick={() => centerView(item)}>[center]</div>
            <div className={'close button'} onClick={() => setSelectedItem(false)}>[x]</div>

            <div className={'text'}>
                <div>{item.type.toUpperCase() + ' #' + item.id + ' (' + item.x + ':' + item.y + ')'}</div>
                <div>Level: {item.level}</div>
                <div>Seed: {item.items.length}</div>
                {item.user && <div>User: {item.user}</div>}
            </div>

            {selectedItem.user !== '' && <div className={'text'}>

                <div className={'text row'}>
                    <div className={'button'} onClick={() => {
                    }}>Upgrade {item.level} → {(item.level + 1)}</div>
                    <div onClick={() => {
                    }}>{'300 Water'}</div>
                </div>

                <div className={'text row'}>
                    <div className={'button'}>Seed</div>
                    <div>30:33</div>
                </div>

                <div className={'text row'}>
                    <div className={'button'}>Root</div>
                    <div>100 Water</div>
                </div>
            </div>}

            {selectedItem.user !== '' && <div className={'text row'}>
                <div className={'button'} onClick={() => prev()}>Prev</div>
                <div>{userItemsIds.indexOf(selectedItem.id) + 1} / {userItems.length}</div>
                <div className={'button'} onClick={() => next()}>Next</div>
            </div>}

        </div>
    )
}

export default Entity