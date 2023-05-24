import React, {FC, useContext, useEffect, useLayoutEffect, useState} from "react";
import {Map} from '../../types'
import {MapContext} from "../../context/MapContext";
import {Cell} from "./Cell";
import entity from "../overlay/Entity";
import {getRatioWidth, getRatioHeight} from "./cells/helpers/getRatio";
import {UserContext} from "../../context/UserContext";


interface GridProps {
    map: Map,
    clickTile: (x, y) => void
}

export const Grid: FC<GridProps> = ({map, clickTile}) => {

    const {setGridCSS, cellSize, setCellCSS, currentPositionX, currentPositionY, isCoordinates, updateCenter} = useContext(MapContext)
    const {selectedItem} = useContext(UserContext)
    const [ratioWidth, setRatioWidth] = useState(getRatioWidth(cellSize))
    const [ratioHeight, setRatioHeight] = useState(getRatioHeight(cellSize))

    useLayoutEffect(() => {
        setCellCSS(cellSize)

        // console.log(map)

        // setGridCSS(ratioWidth, ratioHeight)

        let rw = getRatioWidth(cellSize)
        let rh = getRatioHeight(cellSize)

        setGridCSS(rw, rh)

        setRatioWidth(rw)
        setRatioHeight(rh)

        // console.log(cellSize + ' ' + rw + ' ' + rh)

        window.addEventListener('resize', (() => {
            console.log('resize')
            setRatioWidth(getRatioWidth(cellSize))
            setRatioHeight(getRatioHeight(cellSize))
            // updateCenter(cellSize, 0)
        }))


    }, [cellSize, ratioWidth, ratioHeight, map])

    // useEffect(() => {
    //
    //     console.log('update grid ratio')
    //     // TODO REDO
    //
    // }, [cellSize])
    //
    // useEffect(() => {
    //     // if (selectedItem)
    //     //     centerView(selectedItem)
    // },[])

    const renderGrid = () => {

        // console.log('start render')

        let arrayCell = []

        // For each row in grid from 0 to end
        for (let j = 0; j < ratioHeight; j++) {
            // For each cell in grid from 0 to end
            for (let i = 0; i < ratioWidth; i++) {

                const x = i + currentPositionX
                const y = j + currentPositionY

                // console.log(map[x])

                const exist = map[x] && map[x][y]

                // if (map.length)
                //     console.log('exist')
                // console.log(x + ': ' + map[x])

                arrayCell.push(<Cell key={i + ':' + j}
                                     selected={exist && map[x][y].id && map[x][y].id === selectedItem.id}
                                     x={x}
                                     y={y}
                                     entity={exist ? map[x][y] : null}
                                     clickTile={clickTile}
                                     isCoordinates={isCoordinates}
                                     />)
            }
        }

        // console.log('end render')

        return arrayCell
    }

    return <div className={`grid ${isCoordinates ? 'debug' : ''}`} onScroll={() => {console.log('scroll')}}>
        {
            renderGrid()
        }
    </div>
}