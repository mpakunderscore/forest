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
        <div className={'item'} onClick={() => {}}>

            <div className={'center'} onClick={() => centerView(item)}>[center]</div>

            <div className={'text'}>
                <div>Type: {item.type}</div>
                <div>ID: {item.id}</div>
                <div>Map: {item.x}:{item.y}</div>

                <div>Level: {item.level}</div>
                <div>Seed: {item.items}</div>
                <div>User: {item.user}</div>
            </div>

            <div className={'text item-items'}>
                <div>
                    <div>Sentient</div>
                    <div>{item.user ? 4 : 0}</div>
                </div>
            </div>

            <div className={'text item-items'}>

                <div>
                    <div className={'button'} onClick={() => {}}>Water</div>
                    <div onClick={() => {}}>{84 + ' / ' + 340}</div>
                </div>

                <div>
                    <div>CO2</div>
                    <div onClick={() => {}}>{2 + ' / ' + 4}</div>
                </div>

                <div>
                    <div>Nitrogen</div>
                    <div onClick={() => {}}>{.1 + ' / ' + 1}</div>
                </div>

                <div>
                    <div>Phosphorus</div>
                    <div onClick={() => {}}>{.03 + ' / ' + .2}</div>
                </div>

            </div>

            <div className={'text item-controls'}>
                <div>Network inventory</div>
            </div>

            {/*<div className={'text item-controls'}>*/}
            {/*    <div className={'button'} onClick={() => {*/}
            {/*        centerView(item)*/}
            {/*    }}>Center</div>*/}
            {/*    <div onClick={() => {*/}
            {/*        // centerViewAuto()*/}
            {/*    }}></div>*/}
            {/*</div>*/}

            <div className={'text item-controls'}>
                <div className={'button'} onClick={() => {}}>Upgrade to {(item.level + 1)}</div>
                <div onClick={() => {}}>{'300 Water'}</div>
            </div>

            <div className={'text item-controls'}>
                <div className={'button'}>Seed</div>
                <div>30:33</div>
            </div>

            <div className={'text item-controls'}>
                <div className={'button'}>Root</div>
                <div>100 Water</div>
            </div>

            {selectedItem.user !== '' && <div className={'text item-controls'}>
                <div className={'button'} onClick={() => prev()}>Prev</div>
                <div>{userItemsIds.indexOf(selectedItem.id) + 1} / {userItems.length}</div>
                <div className={'button'} onClick={() => next()}>Next</div>
            </div>}

        </div>
    )
}

export default ItemView