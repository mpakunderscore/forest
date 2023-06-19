import React, {useContext, useState} from "react";
import {MapContext} from "../../../context/MapContext";

const Inventory = (props) => {

    // const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    let [inventory, setInventory] = useState(['seed', '', '', '', '', '', '', '', ''])
    let [selectedInventory, setSelectedInventory] = useState(-1)

    return (
        <div className={'inventory'}>
            {inventory.map((item, i) => {
                return <div key={i}
                            className={selectedInventory === i ? 'selected' : ''}
                            onClick={() => setSelectedInventory(i)}>{item}</div>
            })}
        </div>
    )
}

export default Inventory