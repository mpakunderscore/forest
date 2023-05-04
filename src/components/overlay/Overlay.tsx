import React, {useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import Controls from "./Controls";

const Overlay = (props) => {

    let [inventory, setInventory] = useState(['seed', 'look', 'kill', 'poop', 'take', 'feed', 'ask', 'follow', ''])
    let [selectedInventory, setSelectedInventory] = useState(-1)

    const initKeyboard = () => {
        document.addEventListener("keydown", function (event) {
            if (event.which === 39) {
                props.changePositionX(1)
                props.renderGrid();
            }
            if (event.which === 37) {
                props.changePositionX(-1)
                props.renderGrid();
            }
            if (event.which === 40) {
                props.changePositionY(1)
                props.renderGrid();
            }
            if (event.which === 38) {
                props.changePositionY(-1)
                props.renderGrid();
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
                props.changePositionX(-1)
                props.renderGrid()
            }

            if (velocityX < -.5) {
                props.changePositionX(1)
                props.renderGrid()
            }

            if (velocityY > .5) {
                props.changePositionY(-1)
                props.renderGrid()
            }

            if (velocityY < -.5) {
                props.changePositionY(1)
                props.renderGrid()
            }
        }
    }

    useEffect(() => {
        // generateMap()
        initGestures()
        initKeyboard()
    }, [])

    return (
        <div className={'ui'}>

            {/*Inventory*/}
            <div className={'inventory'}>
                {inventory.map((item, i) => {
                    return <div key={i}
                                className={selectedInventory === i ? 'selected' : ''}
                                onClick={() => setSelectedInventory(i)}>{item}</div>
                })}
            </div>

            {/*Item*/}
            {props.selectedCellX && props.selectedItem && <div className={'item'} onClick={() => {
                props.setSelectedCellX('')
                props.setSelectedCellY('')
            }}>
                <div
                    className={'title'}>{'Pine tree'.toUpperCase() + ' ' + props.selectedCellX + ':' + props.selectedCellY + ' '}</div>
                <div className={'text'}>Level: {(props.map[props.selectedCellX][props.selectedCellY])}</div>
                <div className={'text'}>Seed: {0}</div>
                <div className={'text'}>Pine trees have adapted to thrive in harsh environments, with some species even
                    growing on rocky cliffs.
                </div>


            </div>}

            <Controls time={props.time}
                      cellSize={props.cellSize}
                      isCoordinates={props.isCoordinates}
                      showCoordinates={props.showCoordinates}
            />

        </div>)
}

export default Overlay