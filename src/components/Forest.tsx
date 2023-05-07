import React, {useEffect, useState} from "react";
import '../css/grid.css'
import '../css/overlay.css'
import Grid from "./grid/Grid";
import Overlay from "./overlay/Overlay";

// let currentPositionX = 0
// let currentPositionY = 0

const Forest = (props) => {

    const [currentPositionX, setCurrentPositionX] = useState(-10)
    const [currentPositionY, setCurrentPositionY] = useState(-10)

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

        if (props.map[x][y] && props.map[x][y].type) {
            console.log(props.map[x][y])
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