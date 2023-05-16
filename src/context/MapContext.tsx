import React, {createContext, useCallback, useEffect, useState} from 'react';
import {getRatioHeight, getRatioWidth} from "../components/grid/cells/helpers/getRatio";

const CELL_SIZE_DEFAULT = 40 // px

// const POSITION_X_DEFAULT = -5 // redo
// const POSITION_Y_DEFAULT = -10

const POSITION_X = 'POSITION_X'
const POSITION_Y = 'POSITION_Y'

export type MapContextType = {
    CELL_SIZE_DEFAULT: number,
    cellSize: number,
    setCellSize: (number) => void
    changeCellSize: (number) => void
    setCellCSS: (size) => void,
    setGridCSS: (x, y) => void,
    isCoordinates: boolean,
    showCoordinates: (number) => void,
    currentPositionX: number,
    currentPositionY: number,
    changePosition: (x, y) => void,
    // contextX: number,
    // contextY: number,
    centerView: (item, number?) => void
    centerViewAuto: () => void
}

const MapContext = createContext<MapContextType>({} as MapContextType)

const setCellCSS = (size) => {
    document.documentElement.style.setProperty('--cell-width', size + 'px');
}

setCellCSS(CELL_SIZE_DEFAULT)

const setGridCSS = (x, y) => {
    document.documentElement.style.setProperty('--x-count', x);
    document.documentElement.style.setProperty('--y-count', y);
}

const MapContextProvider = ({children}) => {

    const [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)
    const [isCoordinates, showCoordinates] = useState(true)

    console.log(localStorage.getItem(POSITION_X))
    console.log(localStorage.getItem(POSITION_Y))

    const positionX: number = Number(localStorage.getItem(POSITION_X))
    const positionY: number = Number(localStorage.getItem(POSITION_Y))

    const [currentPositionX, setCurrentPositionX] = useState(positionX)
    const [currentPositionY, setCurrentPositionY] = useState(positionY)

    const changeCellSize = (value) => {

        // console.log(cellSize)

        const centerX = (Math.floor(getRatioWidth(cellSize) / 2)) + currentPositionX
        const centerY = (Math.floor(getRatioHeight(cellSize) / 2)) + currentPositionY

        console.log(centerX + ':' + centerY)

        setCellSize(cellSize - value)
        // TODO change position
        centerView({x: centerX, y: centerY}, cellSize - value)

    }

    const changePosition = (x, y) => {
        setCurrentPositionX((prevState) => prevState + x)
        setCurrentPositionY((prevState) => prevState + y)

        localStorage.setItem(POSITION_X, String(currentPositionX))
        localStorage.setItem(POSITION_Y, String(currentPositionY))
    }

    const centerView = (item, cellSize = 30) => {
        const centerX = Math.floor(getRatioWidth(cellSize) / 2)
        const centerY = Math.floor(getRatioHeight(cellSize) / 2)

        // let centerX = 0
        // let centerY = 0

        console.log(item)
        console.log(centerX + ':' + centerY)

        // changePosition(0, 1)

        setCurrentPositionX(item.x - centerX)
        setCurrentPositionY(item.y - centerY)

        // contextX = item.x - centerX
        // contextY = item.y - centerY

    }

    const centerViewAuto = () => {
        setCenterViewAuto(!isCenterViewAuto)
    }

    const [isCenterViewAuto, setCenterViewAuto] = useState(false)

    const context = {
        CELL_SIZE_DEFAULT,
        cellSize,
        setCellSize,
        changeCellSize,
        setCellCSS,
        setGridCSS,
        isCoordinates,
        showCoordinates,
        currentPositionX,
        currentPositionY,
        changePosition,
        // contextX,
        // contextY,
        centerView,
        centerViewAuto
    }

    // useEffect(() => {
    //     // initGestures()
    //     // initKeyboard()
    // }, [])

    // console.log('context')

    return (
        <MapContext.Provider value={context}>
            {children}
        </MapContext.Provider>
    )
}

export {MapContext, MapContextProvider}