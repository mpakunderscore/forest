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
                <div className={'text'}>Shards of sentient matter rained down from the sky. Something larger was destroyed to sow the seedlings.</div>
                <div className={'text'}>You will start with a few "sentient" points on trees and animals. These trees and other units can evolve over time and acquire different skills that depend on sentient points. You must build a network of trees, roots, units and other things that you can find in the forest. And create a way to return to the global connected universe, your digital home.</div>
                <div className={'text'}>Please, select a name:</div>
                <input spellCheck={false}/>
                <div className={'text button'} onClick={() => props.setWelcome(false)}>Start</div>
            </div>
        </div>
    )
}

export default Welcome