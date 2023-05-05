import React, {useContext, useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import {grass} from "../ground/ground";
import {log} from "../../utils/log";
import {MapContext} from "../MapContext";
import Cell from "./Cell";

const Grid = (props) => {

    let [grid, setGrid] = useState([])

    const { cellSize, CELL_SIZE_DEFAULT, isCoordinates, setCSS, setGridCSS } = useContext(MapContext)

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

                // TODO
                let cell = {
                    i,
                    j,
                    x,
                    y,
                    type: map[x] && map[x][y] && map[x][y].type ? map[x][y].type : false,
                    level: map[x] && map[x][y] && map[x][y].level ? map[x][y].level : false,
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

                    {item.type && <Cell item={item}/>}

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