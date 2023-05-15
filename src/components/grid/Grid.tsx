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
        centerView
    } = useContext(MapContext)

    let {selectedItem, setSelectedItem} = useContext(UserContext)

    let renderGrid = (map) => {

        console.log('render grid')

        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)
        setGridCSS(ratioWidth, ratioHeight)

        grid = []
        // userItems = []
        // userItemsIds = []

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                const x = i + currentPositionX
                const y = j + currentPositionY

                if (map[x] && map[x][y] && map[x][y].user && map[x][y].user === 'test') {
                    // userItems.push(map[x][y])
                    // userItemsIds.push(map[x][y].id)
                    // if (userItems.length === 1)
                    //     centerView(map[x][y])
                }

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

                    // soil: map[x] ? Math.floor(Math.random() * ((i + j) % 3) + Math.random() * ((i * j) % 2)) : 1
                    soil: 4
                }

                // if (map[x] && map[x][y] && map[x][y].id === selectedItem.id)
                //     centerView(map[x][y])


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

    useEffect(() => {
    }, [])

    return (
        <div className={'grid' + (isCoordinates ? ' debug' : '')}>
            {grid.map((item, i) => {

                const x = item.x
                const y = item.y

                const radius = Math.sqrt(x * x + y * y + 3)
                const isFog = false
                let opacity = radius < 10 ? 1 : isCoordinates ? 1 : (radius < 15 ? .2 : .05)


                return <div key={i}
                            id={'cell' + i}
                            className={
                                'cell' +
                                // (item.center ? ' center' : '') +
                                (item.id === selectedItem.id ? ' selected' : '') +
                                (item.user === 'test' ? ' user' : '') +
                                (item.type ? ' ' + item.type : '') +

                                (isCoordinates ? ' debug' : '')
                            }
                            style={{
                                backgroundColor: item.type && !item.user ?
                                    (item.type === 'tree' ? grass[2].color : grass[3].color) :
                                    (grass[item.soil] ? grass[item.soil].color : ''),
                                opacity

                            }}
                            onClick={() => props.clickTile(item.x, item.y)}>

                    {!isCoordinates && item.type && <CellImage item={item}/>}

                    {isCoordinates && <div className={'coordinates'} style={{fontSize: '5px'}}>
                        {/*<div>{item.x}</div>:<div>{item.y}</div>*/}
                    </div>}

                    {/*<img src={getGround().src} style={getGround().style}/>*/}

                </div>
            })}
        </div>
    )
}

export default Grid