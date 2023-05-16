import React, {createContext, useCallback, useEffect, useState} from 'react';
import {getRatioHeight, getRatioWidth} from "../components/grid/cells/helpers/getRatio";

const CELL_SIZE_DEFAULT = 40 // px

const POSITION_X_DEFAULT = -5 // redo
const POSITION_Y_DEFAULT = -10

const POSITION_X = 'POSITION_X'
const POSITION_Y = 'POSITION_Y'
const CELL_SIZE = 'CELL_SIZE'

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

    const [cellSize, setCellSize] = useState(Number(localStorage.getItem(CELL_SIZE)) || CELL_SIZE_DEFAULT)
    const [isCoordinates, showCoordinates] = useState(true)

    // console.log(localStorage.getItem(POSITION_X))
    // console.log(localStorage.getItem(POSITION_Y))

    const positionX: number = Number(localStorage.getItem(POSITION_X)) || POSITION_X_DEFAULT
    const positionY: number = Number(localStorage.getItem(POSITION_Y)) || POSITION_Y_DEFAULT
    console.log(positionX + ':' + positionY)

    const [currentPositionX, setCurrentPositionX] = useState(positionX)
    const [currentPositionY, setCurrentPositionY] = useState(positionY)

    const changeCellSize = (value) => {

        // console.log(cellSize)

        const centerX = (Math.floor(getRatioWidth(cellSize) / 2)) + currentPositionX
        const centerY = (Math.floor(getRatioHeight(cellSize) / 2)) + currentPositionY

        // console.log(centerX + ':' + centerY)

        setCellSize(cellSize - value)
        localStorage.setItem(CELL_SIZE, String(cellSize - value))


        // TODO change position
        centerView({x: centerX, y: centerY}, cellSize - value)
    }

    const changePosition = (x, y) => {

        console.log('changePosition')

        setCurrentPositionX((prevState) => {
            localStorage.setItem(POSITION_X, String(prevState + x))
            return prevState + x
        })
        setCurrentPositionY((prevState) => {
            localStorage.setItem(POSITION_Y, String(prevState + y))
            return prevState + y
        })
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
        localStorage.setItem(POSITION_X, String(item.x - centerX))
        setCurrentPositionY(item.y - centerY)
        localStorage.setItem(POSITION_Y, String(item.y - centerY))

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