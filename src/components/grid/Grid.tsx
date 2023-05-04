import React, {useContext, useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import {grass} from "../ground/ground";
import {log} from "../../utils/log";
import {MapContext} from "../MapContext";

const Grid = (props) => {

    let [grid, setGrid] = useState([])

    const { cellSize, CELL_SIZE_DEFAULT, isCoordinates, setCSS, setGridCSS } = useContext(MapContext)

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

    let renderGrid = (map) => {

        // console.log(map)

        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)
        setGridCSS(ratioWidth, ratioHeight)

        // grid = []

        // if (ratioWidth % 2 === 0) {
        //     ratioWidth--
        // }
        // if (ratioHeight % 2 === 0) {
        //     ratioHeight--
        // }

        let centerX = Math.floor(ratioWidth/2)
        let centerY = Math.floor(ratioHeight/2)

        // log(centerX + ' ' + centerY)

        grid = []

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                // console.log(props.currentPositionX)

                const x = i + props.currentPositionX
                const y = j + props.currentPositionY

                let center = false
                if (i === centerX && j === centerY)
                    center = true

                let cell = {
                    i,
                    j,
                    x,
                    y,
                    type: map[x] && map[x][y] && !map[x][y].empty ? map[x][y].type : false,
                    center,
                    soil: -1
                }

                // console.log(cell.type)

                grid.push(cell);
            }
        }

        setGrid(grid)
    }

    let debounce = (func) => {

        let timer;
        return (event) => {
            if (timer)
                clearTimeout(timer)
            timer = setTimeout(func, 30, event)
        }
    }

    // console.log(props.map)

    useEffect(() => {
        setCSS(cellSize)
        renderGrid(props.map)
        window.addEventListener('resize', debounce(() => renderGrid(props.map)))
    }, [props.map, props.currentPositionX, props.currentPositionY, cellSize])

    return (
        <div id={'grid'}>
            {grid.map((item, i) => {
                return <div key={i}
                            // id={item.x + ':' + item.y}
                            className={
                                'cell' +
                                // (item.center ? ' center' : '') +
                                (item.x === props.selectedCellX && item.y === props.selectedCellY ? ' selected' : '') +

                                // (' ' + soil[item.soil].type) +

                                ('')
                            }
                            style={{background: grass[item.soil] ? grass[item.soil].color : ''}}
                            onClick={() => props.clickTile(item.x, item.y)}>

                    {item.type && <img src={getImage(item.type).src}
                                       style={{...getImage(item.type).style, border: isCoordinates ? '1px solid red' : ''}}
                    />}

                    {isCoordinates && <div className={'coordinates'}>
                        <div>{item.x}</div>:
                        <div>{item.y}</div>
                    </div>}

                    {/*<img src={getGround().src} style={getGround().style}/>*/}

                </div>
            })}
        </div>
    )
}

export default Grid