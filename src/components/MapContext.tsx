import React, {createContext, useState} from 'react';

let CELL_SIZE_DEFAULT = 30

export type MapContextType = {
    cellSize: number,
    setCellSize: (number) => void
    setCSS: (size) => void,
    setGridCSS:  (x, y) => void,
    CELL_SIZE_DEFAULT
}

const MapContext = createContext<MapContextType>({} as MapContextType)

let setCSS = (size) => {
    document.documentElement.style.setProperty('--cell-width', size + 'px');
}

let setGridCSS = (x, y) => {
    document.documentElement.style.setProperty('--x-count', x);
    document.documentElement.style.setProperty('--y-count', y);
}

setCSS(CELL_SIZE_DEFAULT)

const MapContextProvider = ({children}) => {

    const [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)

    const context = {
        cellSize,
        setCellSize,
        setCSS,
        setGridCSS,
        CELL_SIZE_DEFAULT
    }

    return (
        <MapContext.Provider value={context}>
            {children}
        </MapContext.Provider>
    )
}

export { MapContext, MapContextProvider }