import React, {useContext, useEffect} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const Entity = (props) => {

    const userItems = props.user.userItems
    const userItemsIds = userItems.map(item => item.id)

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {cellSize, centerView, currentPositionX, currentPositionY} = useContext(MapContext)

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


            <div className={'text row'}>
                <div>{item.type.toUpperCase() + ' #' + item.id + ' (' + item.level + ') (' + item.x + ':' + item.y + ')'}</div>
                <div className={'button'} onClick={() => centerView(item, cellSize)}>[center]</div>
                <div className={'button'} onClick={() => setSelectedItem(false)}>[x]</div>
            </div>

            {selectedItem.user !== '' && <div className={'text'}>

                <div className={'text row'}>
                    <div className={'button'}>Level</div>
                    <div>{item.level}</div>
                </div>

                {/*<div className={'text row'}>*/}
                {/*    <div className={'button'}>Sentient</div>*/}
                {/*    <div>5</div>*/}
                {/*</div>*/}

                <div className={'text row'}>
                    <div className={'button'}>Water</div>
                    <div>131</div>
                </div>

                <div className={'text row'}>
                    <div className={'button'}>Seed</div>
                    <div>{item.items.length}</div>
                </div>
            </div>}

            {selectedItem.user !== '' && <div className={'text'}>

                <div className={'text row'}>
                    <div className={'button'} onClick={() => {
                    }}>Upgrade {item.level} → {(item.level + 1)}</div>
                    <div onClick={() => {
                    }}>{'Water 300'}</div>
                </div>

                <div className={'text row'}>
                    <div className={'button'}>Seed</div>
                    <div>Water 100</div>
                </div>

                <div className={'text row'}>
                    <div className={'button'}>Root</div>
                    <div>Water 100</div>
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