import React, {useContext, useEffect} from "react";
import {UserContext} from "../../../../context/UserContext";
import {MapContext} from "../../../../context/MapContext";
// import {MapContext} from "../../context/MapContext";
// import {UserContext} from "../../context/UserContext";

const Navigation = (props) => {

    const userItems = props.user.userItems
    console.log(props.user)
    const userItemsIds = userItems.map(item => item.id)

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {cellSize, centerView, currentPositionX, currentPositionY} = useContext(MapContext)

    const item = selectedItem

    // useEffect(() => {
    //
    // }, [selectedItem, currentPositionX, currentPositionY])

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
        <div className={'navigation'}>

            {selectedItem.user !== '' && <div className={'row'}>
                <div className={'text button'} onClick={() => prev()}>PREV</div>
                <div className={'text'}>{userItemsIds.indexOf(selectedItem.id) + 1} / {userItems.length}</div>
                <div className={'text button'} onClick={() => next()}>NEXT</div>
            </div>}

        </div>
    )
}

export default Navigation