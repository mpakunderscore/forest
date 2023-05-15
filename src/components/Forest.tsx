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
    const {currentPositionX, currentPositionY, centerView, cellSize} = useContext(MapContext)

    const clickTile = (x, y) => {

        if (props.map[x][y] && props.map[x][y].type) {
            setSelectedItem(props.map[x][y])
        } else
            setSelectedItem(false)
    }

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        if (props.user.userItems) {
            for (let i = 0; i < props.user.userItems.length; i++) {

                let item = props.user.userItems[i]
                const nextItem = props.user.userItems[i + 1]

                if (nextItem) {

                    const startLineX = (item.x - currentPositionX) * cellSize + cellSize/1.3
                    const startLineY = (item.y - currentPositionY) * cellSize + cellSize/1.3

                    const endLineX = (nextItem.x - currentPositionX) * cellSize + cellSize/1.3
                    const endLineY = (nextItem.y - currentPositionY) * cellSize + cellSize/1.3

                    ctx.beginPath()
                    ctx.moveTo(startLineX, startLineY)
                    ctx.lineTo(endLineX, endLineY)
                    ctx.strokeStyle = '#0d1810'
                    ctx.stroke()
                }
            }
        }



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