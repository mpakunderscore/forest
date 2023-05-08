import React, {useContext, useEffect} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const ItemView = (props) => {

    const {userItems, selectedItem, setSelectedItem, userItemsIds, setUserItemsIds} = useContext(UserContext)
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
        centerView(userItems[nextIndex])
    }

    const prev = () => {

    }

    return (
        <div className={'item'} onClick={() => {}}>
            <div className={'text'}>
                <div>ID: {item.id}</div>
                <div>Type: {item.type}</div>
                <div>Level: {item.level}</div>
                <div>Seed: {item.items}</div>
                <div>X: {item.x}</div>
                <div>Y: {item.y}</div>
                <div>User: {item.user}</div>
            </div>

            {/*<div className={'text item-controls'}>*/}
            {/*    <div onClick={() => {*/}
            {/*        centerView(item)*/}
            {/*    }}>Center</div>*/}
            {/*    <div onClick={() => {*/}
            {/*        centerViewAuto()*/}
            {/*    }}>Auto</div>*/}
            {/*</div>*/}

            <div className={'text item-controls'}>
                <div className={'button'} onClick={() => prev()}>Prev</div>
                <div>{userItemsIds.indexOf(selectedItem.id) + 1} / {userItems.length}</div>
                <div className={'button'} onClick={() => next()}>Next</div>
            </div>

        </div>
    )
}

export default ItemView