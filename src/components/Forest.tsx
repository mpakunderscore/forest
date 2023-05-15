import React, {useContext, useEffect, useRef} from "react";
import '../css/grid.css'
import '../css/overlay/overlay.css'
import Grid from "./grid/Grid";
import Overlay from "./overlay/Overlay";
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";
import Canvas from "../canvas/Canvas";

const Forest = (props) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {centerView} = useContext(MapContext)

    const clickTile = (x, y) => {

        if (props.map[x][y] && props.map[x][y].type) {
            setSelectedItem(props.map[x][y])
        } else
            setSelectedItem(false)
    }

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        ctx.beginPath()
        ctx.moveTo(300, 300)
        ctx.lineTo(700, 700)
        ctx.strokeStyle = '#ffffff'
        ctx.stroke()

        // ctx.beginPath()
        // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        // ctx.fill()
    }

    // log('ground forest')

    return (
        <div>
            <Grid clickTile={clickTile} map={props.map}/>
            <Overlay time={props.time} map={props.map} user={props.user}/>
            <Canvas draw={draw}/>
        </div>
    )
}

export default Forest;