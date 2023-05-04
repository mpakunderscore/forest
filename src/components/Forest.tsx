import React, {useState, useEffect, useReducer, useRef, useContext} from "react";
import '../css/grid.css'
import '../css/ui.css'
import '../css/ground.css'
import {log} from '../utils/log';
import {socketAPI} from "../utils/socket";
import Grid from "./grid/Grid";
import Overlay from "./overlay/Overlay";
import {MapContext} from "./MapContext";

let currentPositionX = 0
let currentPositionY = 0

const changePositionX = (val) => {
    currentPositionX = currentPositionX + val
}

const changePositionY = (val) => {
    currentPositionY = currentPositionY + val
}

const Forest = (props) => {

    const { cellSize, setCSS, setGridCSS } = useContext(MapContext)

    // let renderGrid = () => {
    //
    //     let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
    //     let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)
    //     setGridCSS(ratioWidth, ratioHeight)
    //
    //     let grid = []
    //
    //     // if (ratioWidth % 2 === 0) {
    //     //     ratioWidth--
    //     // }
    //     // if (ratioHeight % 2 === 0) {
    //     //     ratioHeight--
    //     // }
    //
    //     let centerX = Math.floor(ratioWidth/2)
    //     let centerY = Math.floor(ratioHeight/2)
    //
    //     // log(centerX + ' ' + centerY)
    //
    //     for (let j = 0; j < ratioHeight; j++) {
    //
    //         for (let i = 0; i < ratioWidth; i++) {
    //
    //             const x = i + currentPositionX
    //             const y = j + currentPositionY
    //
    //             let center = false
    //             if (i === centerX && j === centerY)
    //                 center = true
    //
    //             let cell = {
    //                 x,
    //                 y,
    //                 type: props.map && props.map[x] && props.map[x][y] ? props.map[x][y].type : false,
    //                 center,
    //                 soil: -1
    //             }
    //
    //             grid.push(cell);
    //         }
    //     }
    //
    //     setGrid(grid)
    // }

    // const getGround = () => {
    //     return {src: './images/forest/texture.png', style: getStyle(cellSize)}
    // }

    let [selectedCellX, setSelectedCellX] = useState('')
    let [selectedCellY, setSelectedCellY] = useState('')
    let [selectedItem, setSelectedItem] = useState(false)

    const clickTile = (x, y) => {
        log(x + ':' + y)
        setSelectedCellX(x)
        setSelectedCellY(y)

        // log(props.map[x][y])

        if (props.map[x][y].length > 0) {
            log('Selected: ' + props.map[x][y])
            setSelectedItem(props.map[x][y])
        } else
            setSelectedItem(false)

        socketAPI.sendSeed({x, y})
    }

    // log('ground forest')

    return (
        <div>
            <Overlay currentPositionX={currentPositionX}
                     currentPositionY={currentPositionY}
                     selectedCellX={selectedCellX}
                     selectedCellY={selectedCellY}
                     setSelectedCellX={setSelectedCellX}
                     setSelectedCellY={setSelectedCellY}
                     selectedItem={selectedItem}
                     changePositionX={changePositionX}
                     changePositionY={changePositionY}
                     time={props.time}
                     map={props.map}

            />

            <Grid currentPositionX={currentPositionX}
                  currentPositionY={currentPositionY}
                  selectedCellX={selectedCellX}
                  selectedCellY={selectedCellY}
                  setSelectedCellX={setSelectedCellX}
                  setSelectedCellY={setSelectedCellY}
                  clickTile={clickTile}
                  map={props.map}
            />

        </div>
    )
}

export default Forest;