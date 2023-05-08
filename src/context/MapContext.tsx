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
    contextX: number,
    contextY: number
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

let contextX = POSITION_X_DEFAULT
let contextY = POSITION_Y_DEFAULT

const MapContextProvider = ({children}) => {

    const initKeyboard = () => {
        document.addEventListener("keydown", function (event) {

            // console.log('keydown: ' + contextX)
            // contextX++

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

    const [currentPositionX, setCurrentPositionX] = useState(-10)
    const [currentPositionY, setCurrentPositionY] = useState(-10)

    const changePosition = (x, y) => {
        setCurrentPositionX(currentPositionX + x)
        contextX = contextX + x
        setCurrentPositionY(currentPositionY + y)
        contextY = contextY + y
    }

    const [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)
    const [isCoordinates, showCoordinates] = useState(false)

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
        contextX,
        contextY
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