import React, {useContext} from "react";
import {MapContext} from "../../context/MapContext";

const ItemView = (props) => {

    // const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    const item = props.map[props.selectedCellX][props.selectedCellY]

    // console.log(item)

    return (
        <div className={'item'} onClick={() => {
            props.setSelectedCellX('')
            props.setSelectedCellY('')
        }}>
            <div>
                <div className={'text'}>ID: {item.id}</div>
                <div className={'text'}>Type: {item.type}</div>
                <div className={'text'}>Level: {item.level}</div>
                <div className={'text'}>Seed: {item.items}</div>
                <div className={'text'}>X: {props.selectedCellX}</div>
                <div className={'text'}>Y: {props.selectedCellY}</div>
                <div className={'text'}>User: {item.user}</div>
            </div>

        </div>
    )
}

export default ItemView