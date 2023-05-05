import React, {useState, useEffect, useReducer, useRef, useContext} from "react";
import '../css/grid.css'
import '../css/ui.css'
import '../css/ground.css'
import {log} from '../utils/log';
import {socketAPI} from "../utils/socket";
import Grid from "./grid/Grid";
import Overlay from "./overlay/Overlay";

// let currentPositionX = 0
// let currentPositionY = 0

const Forest = (props) => {

    const [currentPositionX, setCurrentPositionX] = useState(0)
    const [currentPositionY, setCurrentPositionY] = useState(0)

    const changePositionX = (val) => {
        setCurrentPositionX(currentPositionX + val)
    }

    const changePositionY = (val) => {
        setCurrentPositionY(currentPositionY + val)
    }

    let [selectedCellX, setSelectedCellX] = useState('')
    let [selectedCellY, setSelectedCellY] = useState('')

    let [selectedItem, setSelectedItem] = useState(false)

    const clickTile = (x, y) => {

        setSelectedCellX(x)
        setSelectedCellY(y)

        if (props.map[x][y]) {
            log('Selected: ' + props.map[x][y])
            setSelectedItem(props.map[x][y])
        } else
            setSelectedItem(false)

        // socketAPI.sendSeed({x, y})
    }

    useEffect(() => {

    }, [currentPositionX, currentPositionY])

    // log('ground forest')

    return (
        <div>
            <Overlay currentPositionX={currentPositionX}
                     currentPositionY={currentPositionY}
                     selectedCellX={selectedCellX}
                     selectedCellY={selectedCellY}
                     setSelectedCellX={setSelectedCellX}
                     setSelectedCellY={setSelectedCellY}
                     selectedItem={selectedItem}
                     changePositionX={changePositionX}
                     changePositionY={changePositionY}
                     time={props.time}
                     map={props.map}

            />

            <Grid currentPositionX={currentPositionX}
                  currentPositionY={currentPositionY}
                  selectedCellX={selectedCellX}
                  selectedCellY={selectedCellY}
                  setSelectedCellX={setSelectedCellX}
                  setSelectedCellY={setSelectedCellY}
                  clickTile={clickTile}
                  map={props.map}
            />

        </div>
    )
}

export default Forest;