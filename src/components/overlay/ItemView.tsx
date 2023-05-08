import React, {useContext} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const ItemView = (props) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {centerView, centerViewAuto} = useContext(MapContext)

    const item = selectedItem

    // console.log(item)

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

            <div className={'text item-controls'}>
                <div onClick={() => {
                    centerView(item)
                }}>Center</div>
                <div onClick={() => {
                    centerViewAuto()
                }}>Auto</div>
            </div>

            <div className={'text item-controls'}>
                <div>Prev</div>
                <div>4 / 10</div>
                <div>Next</div>
            </div>

        </div>
    )
}

export default ItemView