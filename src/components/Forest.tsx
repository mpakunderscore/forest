import React, {useContext, useEffect} from "react";
import '../css/grid.css'
import '../css/overlay/overlay.css'
import Grid from "./grid/Grid";
import Overlay from "./overlay/Overlay";
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";

const Forest = (props) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {centerView} = useContext(MapContext)

    const clickTile = (x, y) => {

        if (props.map[x][y] && props.map[x][y].type) {
            setSelectedItem(props.map[x][y])
        } else
            setSelectedItem(false)
    }

    useEffect(() => {
        // console.log('forest')
        // if (userItems.length > 0)
        //     centerView(userItems[0])
    }, [])


    // log('ground forest')

    return (
        <div>
            <Grid clickTile={clickTile} map={props.map}/>
            <Overlay time={props.time} map={props.map} user={props.user}/>

            {/*<iframe width="0" height="0" src="https://www.youtube.com/embed/XxEhuSJF780?controls=0"*/}
            {/*        title="YouTube video player"*/}
            {/*        frameBorder="0"*/}
            {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
            {/*        allowFullScreen></iframe>*/}
        </div>
    )
}

export default Forest;