import React, {FC, useContext, useEffect} from "react";
import '../css/grid/grid.css'
import '../css/grid/types.css'
import '../css/overlay/overlay.css'
import {Grid} from "./grid/Grid";
import Overlay from "./overlay/Overlay";
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";
import Canvas from "../canvas/Canvas";
import {User, Map} from "../types";

interface ForestProps {
    map: Map
    time: number
    user: User
}

const Forest: FC<ForestProps> = ({user, time, map}) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {setCellCSS, setGridCSS, cellSize} = useContext(MapContext)

    const clickTile = (x, y) => {

        if (map[x][y] && map[x][y].type && map[x][y].id) {
            setSelectedItem(map[x][y])
        } else
            setSelectedItem(false)
    }

    return (
        <div>
            <Grid clickTile={clickTile} map={map}/>
            <Overlay time={time} map={map} user={user}/>
            <Canvas user={user}/>
        </div>
    )
}

export default Forest;