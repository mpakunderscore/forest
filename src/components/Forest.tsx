import React, {useContext, useEffect, useRef} from "react";
import '../css/grid.css'
import '../css/overlay/overlay.css'
import {Grid} from "./grid/Grid";
import Overlay from "./overlay/Overlay";
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";
import Canvas from "../canvas/Canvas";

const Forest = (props) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {setCellCSS, setGridCSS, cellSize} = useContext(MapContext)

    const clickTile = (x, y) => {

        if (props.map[x][y] && props.map[x][y].type) {
            setSelectedItem(props.map[x][y])
        } else
            setSelectedItem(false)
    }

    return (
        <div>
            <Grid clickTile={clickTile} map={props.map}/>
            <Overlay time={props.time} map={props.map} user={props.user}/>
            <Canvas draw={draw}/>
        </div>
    )
}

export default Forest;