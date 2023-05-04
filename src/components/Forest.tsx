import React, {useState, useEffect, useReducer, useRef, useContext} from "react";
import '../css/grid.css'
import '../css/ui.css'
import '../css/ground.css'
import {log} from '../utils/log';
import {socketAPI} from "../utils/socket";
import Grid from "./Grid";
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

    const { cellSize, setCSS, setGridCSS, CELL_SIZE_DEFAULT } = useContext(MapContext)

    let [grid, setGrid] = useState([])

    let [isCoordinates, showCoordinates] = useState(false)

    let renderGrid = () => {

        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)
        setGridCSS(ratioWidth, ratioHeight)

        let grid = []

        // if (ratioWidth % 2 === 0) {
        //     ratioWidth--
        // }
        // if (ratioHeight % 2 === 0) {
        //     ratioHeight--
        // }

        let centerX = Math.floor(ratioWidth/2)
        let centerY = Math.floor(ratioHeight/2)

        // log(centerX + ' ' + centerY)

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                const x = i + currentPositionX
                const y = j + currentPositionY

                let center = false
                if (i === centerX && j === centerY)
                    center = true

                let cell = {
                    x,
                    y,
                    img: props.map && props.map[x] && props.map[x][y] ? getImage(props.map[x][y].type) : false,
                    center,
                    soil: -1
                }

                grid.push(cell);
            }
        }

        setGrid(grid)
    }

    React.useEffect(() => {
        window.addEventListener('resize', debounce(() => renderGrid()))
    })

    let debounce = (func) => {

        let timer;
        return (event) => {
            if (timer)
                clearTimeout(timer)
            timer = setTimeout(func, 30, event)
        }
    }

    let getStyle = (width) => {
        width = width * (cellSize / CELL_SIZE_DEFAULT)
        return {width: width + 'px', height: width + 'px'}
    }

    let images = {
        A: {src: './images/forest/10.png', style: getStyle(33)},
        B: {src: './images/forest/30.png', style: getStyle(60)},
        C: {src: './images/forest/50.png', style: getStyle(100)},
        D: {src: './images/forest/deer.png', style: getStyle(50)},
        R: {src: './images/forest/raccoon.png', style: getStyle(30)},
        X: {src: './images/forest/100.png', style: getStyle(150)},
        Y: {src: './images/forest/100f.png', style: getStyle(180)},
        Z: {src: './images/forest/100r.png', style: getStyle(100)},

    }

    const getImage = (key) => {
        // console.log(key)
        return images[key]
    }

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

    useEffect(() => {
        setCSS(cellSize)
        renderGrid()
    }, [props.map, currentPositionX, currentPositionY, cellSize])

    // log('ground forest')

    return (
        <div>
            <Overlay renderGrid={renderGrid}
                     currentPositionX={currentPositionX}
                     currentPositionY={currentPositionY}
                     selectedCellX={selectedCellX}
                     selectedCellY={selectedCellY}
                     setSelectedCellX={setSelectedCellX}
                     setSelectedCellY={setSelectedCellY}
                     isCoordinates={isCoordinates}
                     showCoordinates={showCoordinates}
                     selectedItem={selectedItem}
                     changePositionX={changePositionX}
                     changePositionY={changePositionY}
                     time={props.time}
                     map={props.map}

            />

            <Grid grid={grid}
                  selectedCellX={selectedCellX}
                  selectedCellY={selectedCellY}
                  setSelectedCellX={setSelectedCellX}
                  setSelectedCellY={setSelectedCellY}
                  isCoordinates={isCoordinates}
                  clickTile={clickTile}
            />

        </div>
    )
}

export default Forest;