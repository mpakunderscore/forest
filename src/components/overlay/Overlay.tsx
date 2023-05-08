import React, {useContext, useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import Controls from "./Controls";
import ItemView from "./ItemView";
import {MapContext} from "../../context/MapContext";
import Inventory from "./Inventory";

const Overlay = (props) => {

    const {changePosition} = useContext(MapContext)

    useEffect(() => {
    }, [])

    return (
        <div className={'overlay'}>

            <Inventory/>

            {props.selectedItem && <ItemView map={props.map}
                                             selectedCellX={props.selectedCellX}
                                             selectedCellY={props.selectedCellY}
            />}

            <Controls time={props.time}/>

        </div>)
}

export default Overlay