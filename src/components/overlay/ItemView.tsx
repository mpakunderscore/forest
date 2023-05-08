import React, {useContext} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const ItemView = (props) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)

    const item = selectedItem

    // console.log(item)

    return (
        <div className={'item'} onClick={() => setSelectedItem(false)}>
            <div>
                <div className={'text'}>ID: {item.id}</div>
                <div className={'text'}>Type: {item.type}</div>
                <div className={'text'}>Level: {item.level}</div>
                <div className={'text'}>Seed: {item.items}</div>
                <div className={'text'}>X: {item.x}</div>
                <div className={'text'}>Y: {item.y}</div>
                <div className={'text'}>User: {item.user}</div>
            </div>

        </div>
    )
}

export default ItemView