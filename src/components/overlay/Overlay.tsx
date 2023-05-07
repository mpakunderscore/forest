import React, {useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import Controls from "./Controls";
import ItemView from "./ItemView";

const Overlay = (props) => {

    let [inventory, setInventory] = useState(['seed', '', '', '', '', '', '', '', ''])
    let [selectedInventory, setSelectedInventory] = useState(-1)

    const initKeyboard = () => {
        document.addEventListener("keydown", function (event) {
            if (event.which === 39) {
                props.changePositionX(1)
            }
            if (event.which === 37) {
                props.changePositionX(-1)
            }
            if (event.which === 40) {
                props.changePositionY(1)
            }
            if (event.which === 38) {
                props.changePositionY(-1)
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
                // props.renderGrid()
            }

            if (velocityX < -.5) {
                props.changePositionX(1)
                // props.renderGrid()
            }

            if (velocityY > .5) {
                props.changePositionY(-1)
                // props.renderGrid()
            }

            if (velocityY < -.5) {
                props.changePositionY(1)
                // props.renderGrid()
            }
        }
    }

    useEffect(() => {
        // generateMap()
        initGestures()
        initKeyboard()
    }, [])

    // const item = props.map[props.selectedCellX][props.selectedCellY]

    return (
        <div className={'overlay'}>

            {/*Inventory*/}
            <div className={'inventory'}>
                {inventory.map((item, i) => {
                    return <div key={i}
                                className={selectedInventory === i ? 'selected' : ''}
                                onClick={() => setSelectedInventory(i)}>{item}</div>
                })}
            </div>

            {props.selectedItem && <ItemView map={props.map}
                                             selectedCellX={props.selectedCellX}
                                             selectedCellY={props.selectedCellY}
            />}

            <Controls time={props.time}/>

        </div>)
}

export default Overlay