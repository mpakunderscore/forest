import React, {useContext, useState} from "react";
import {MapContext} from "../../context/MapContext";

const Welcome = (props) => {

    // const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    // let [inventory, setInventory] = useState(['seed', '', '', '', '', '', '', '', ''])
    // let [selectedInventory, setSelectedInventory] = useState(-1)

    return (
        <div className={'welcome'}>
            <div>
                {/*<img src={'./images/red.png'}/>*/}
                <div className={'title'}>Forest</div>
                <div className={'text'}>Fragments of sentient matter rained down from the sky. Something bigger was destroyed to sow sprouts.</div>
                <div className={'text'}>You will start with several "sentient" points in trees & animals. This trees and other units may evolve throw time and gain different skills, that depends on sentient points. You have to build network of trees, roots, units and other things you may find in a forest. And build a way to get back to global connectivity universe, your digital home.</div>
                <div className={'text'}>Please, select a name:</div>
                <input spellCheck={false}/>
                <div className={'text button'}>Start</div>
            </div>
        </div>
    )
}

export default Welcome