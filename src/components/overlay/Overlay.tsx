import React, {useContext, useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import Controls from "./Controls";
import ItemView from "./ItemView";
import {MapContext} from "../../context/MapContext";
import Inventory from "./Inventory";
import {UserContext} from "../../context/UserContext";

const Overlay = (props) => {

    // const {changePosition} = useContext(MapContext)
    const {selectedItem} = useContext(UserContext)

    useEffect(() => {
    }, [])

    return (
        <div className={'overlay'}>

            <Inventory/>

            {selectedItem && <ItemView map={props.map}/>}

            <Controls time={props.time}/>

        </div>)
}

export default Overlay