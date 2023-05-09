import React, {useContext, useEffect} from "react";
import '../css/grid.css'
import '../css/overlay.css'
import Grid from "./grid/Grid";
import Overlay from "./overlay/Overlay";
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";

const Forest = (props) => {

    const {selectedItem, setSelectedItem, userItems} = useContext(UserContext)
    const {centerView} = useContext(MapContext)

    const clickTile = (x, y) => {

        if (props.map[x][y] && props.map[x][y].type) {
            setSelectedItem(props.map[x][y])
            // centerView(props.map[x][y])
        } else
            setSelectedItem(false)
    }

    useEffect(() => {
        // if (userItems[0])
        //     centerView(userItems[0])
    }, [])


    // log('ground forest')

    return (
        <div>
            <Grid clickTile={clickTile} map={props.map}/>
            <Overlay time={props.time} map={props.map}/>
        </div>
    )
}

export default Forest;