import React, {createContext, useEffect, useState} from 'react';
import {createGesture} from "@ionic/react";

const CELL_SIZE_DEFAULT = 30

const POSITION_X_DEFAULT = -10
const POSITION_Y_DEFAULT = -10

export type MapContextType = {
    CELL_SIZE_DEFAULT: number,
    cellSize: number,
    setCellSize: (number) => void
    setCellCSS: (size) => void,
    setGridCSS: (x, y) => void,
    isCoordinates: boolean,
    showCoordinates: (value) => void,
    currentPositionX: number,
    currentPositionY: number,
    changePosition: (x, y) => void,
    // contextX: number,
    // contextY: number,
    centerView: (item) => void
    centerViewAuto: () => void
}

const MapContext = createContext<MapContextType>({} as MapContextType)

let setCellCSS = (size) => {
    document.documentElement.style.setProperty('--cell-width', size + 'px');
}

setCellCSS(CELL_SIZE_DEFAULT)

let setGridCSS = (x, y) => {
    document.documentElement.style.setProperty('--x-count', x);
    document.documentElement.style.setProperty('--y-count', y);
}

// let contextX = POSITION_X_DEFAULT
// let contextY = POSITION_Y_DEFAULT

const MapContextProvider = ({children}) => {
    const initKeyboard = () => {
        document.addEventListener("keydown", function (event) {
            if (event.which === 39) {
                changePosition(1, 0)
            }
            if (event.which === 37) {
                changePosition(-1, 0)
            }
            if (event.which === 40) {
                changePosition(0, 1)
            }
            if (event.which === 38) {
                changePosition(0, -1)
            }
        })
    }

    const initGestures = () => {

        const gesture = createGesture({
            el: document.getElementById('app'),
            threshold: 15,
            gestureName: 'my-gesture',
            onMove: ev => onMove(ev),
        });

        gesture.enable();

        const onMove = (detail) => {
            const type = detail.type;
            // console.log(type)
            const currentX = detail.currentX;
            const deltaX = detail.deltaX;
            const velocityX = detail.velocityX;
            const velocityY = detail.velocityY;

            // console.log(velocityX + ':' + velocityY)

            if (velocityX > .5) {
                changePosition(-1, 0)
            }

            if (velocityX < -.5) {
                changePosition(1, 0)
            }

            if (velocityY > .5) {
                changePosition(0, -1)
            }

            if (velocityY < -.5) {
                changePosition(0, 1)
            }
        }
    }

    const [currentPositionX, setCurrentPositionX] = useState(POSITION_X_DEFAULT)
    const [currentPositionY, setCurrentPositionY] = useState(POSITION_Y_DEFAULT)

    const changePosition = (x, y) => {
        setCurrentPositionX(currentPositionX + x)
        // contextX = contextX + x
        setCurrentPositionY(currentPositionY + y)
        // contextY = contextY + y
    }

    const [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)
    const [isCoordinates, showCoordinates] = useState(false)

    const centerView = (item) => {
        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)
        let centerX = Math.floor(ratioWidth / 2)
        let centerY = Math.floor(ratioHeight / 2)

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

    useEffect(() => {
        initGestures()
        initKeyboard()
    }, [])

    // console.log('context')

    return (
        <MapContext.Provider value={context}>
            {children}
        </MapContext.Provider>
    )
}

export {MapContext, MapContextProvider}