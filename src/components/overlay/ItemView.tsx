import React, {useContext} from "react";
import {MapContext} from "../MapContext";

const ItemView = (props) => {

    const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    const item = props.map[props.selectedCellX][props.selectedCellY]

    return (
        <div className={'item'} onClick={() => {
            props.setSelectedCellX('')
            props.setSelectedCellY('')
        }}>
            <div className={'title'}>{item.type}</div>

            <div className={'text'}>Level: {item.level}</div>
            <div className={'text'}>Seed: {item.items}</div>
            <div className={'text'}>ID: {item.id}</div>
            <div className={'text'}>{props.selectedCellX + ':' + props.selectedCellY}</div>
            <div className={'text'}>

            </div>

        </div>
    )
}

export default ItemView