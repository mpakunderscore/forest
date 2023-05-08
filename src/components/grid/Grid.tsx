import React, {useContext, useEffect, useState} from "react";
import {grass} from "../ground/ground";
import {MapContext} from "../../context/MapContext";
import CellImage from "./CellImage";
import {UserContext} from "../../context/UserContext";

const Grid = (props) => {

    let [grid, setGrid] = useState([])

    const {
        cellSize,
        CELL_SIZE_DEFAULT,
        isCoordinates,
        setCellCSS,
        setGridCSS,
        currentPositionX,
        currentPositionY,
        // contextX,
        // contextY
    } = useContext(MapContext)

    const {selectedItem, setSelectedItem} = useContext(UserContext)

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

        let centerX = Math.floor(ratioWidth / 2)
        let centerY = Math.floor(ratioHeight / 2)

        // log(centerX + ' ' + centerY)

        grid = []

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                // console.log(props.currentPositionX)

                const x = i + currentPositionX
                const y = j + currentPositionY

                let center = false
                if (i === currentPositionX && j === currentPositionY)
                    center = true

                // TODO ?
                let cell = {
                    id: map[x] && map[x][y] && map[x][y].id ? map[x][y].id : false,
                    ...map[x] && map[x][y] && map[x][y].type ? map[x][y].type : {},
                    i,
                    j,
                    x,
                    y,
                    type: map[x] && map[x][y] && map[x][y].type ? map[x][y].type : false,
                    level: map[x] && map[x][y] && map[x][y].level ? map[x][y].level : false,
                    user: map[x] && map[x][y] && map[x][y].user ? map[x][y].user : false,
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
        setCellCSS(cellSize)
        renderGrid(props.map)
        window.addEventListener('resize', debounce(() => renderGrid(props.map)))
    }, [props.map, currentPositionX, currentPositionY, cellSize])

    return (
        <div className={'grid' + (isCoordinates ? ' debug' : '')}>
            {grid.map((item, i) => {
                return <div key={i}
                    // id={item.x + ':' + item.y}
                            className={
                                'cell' +
                                // (item.center ? ' center' : '') +
                                (item.x === selectedItem.x && item.y === selectedItem.y ? ' selected' : '') +
                                (item.user === 'mpakunderscore' ? ' user' : '') +
                                (isCoordinates ? ' debug' : '') +

                                // (' ' + soil[item.soil].type) +

                                ('')
                            }
                            style={{background: grass[item.soil] ? grass[item.soil].color : ''}}
                            onClick={() => props.clickTile(item.x, item.y)}>

                    {item.type && <CellImage item={item}/>}

                    {isCoordinates && <div className={'coordinates'}>
                        <div>{item.x}</div>
                        :
                        <div>{item.y}</div>
                    </div>}

                    {/*<img src={getGround().src} style={getGround().style}/>*/}

                </div>
            })}
        </div>
    )
}

export default Grid