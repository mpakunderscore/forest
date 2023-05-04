import React, {useContext, useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import {grass} from "../ground/ground";
import {log} from "../../utils/log";
import {MapContext} from "../MapContext";

const Grid = (props) => {

    const { cellSize, CELL_SIZE_DEFAULT, isCoordinates } = useContext(MapContext)

    let getStyle = (width) => {
        width = width * (cellSize / CELL_SIZE_DEFAULT)
        return {width: width + 'px', height: width + 'px'}
    }

    let images = {
        A: {src: './images/forest/10.png', style: getStyle(33)},
        B: {src: './images/forest/30.png', style: getStyle(60)},
        C: {src: './images/forest/50.png', style: getStyle(100)},
        D: {src: './images/forest/deer.png', style: getStyle(50)},
        R: {src: './images/forest/raccoon.png', style: getStyle(30)},
        X: {src: './images/forest/100.png', style: getStyle(150)},
        Y: {src: './images/forest/100f.png', style: getStyle(180)},
        Z: {src: './images/forest/100r.png', style: getStyle(100)},

    }

    const getImage = (key) => {
        // console.log(key)
        return images[key]
    }

    useEffect(() => {

    }, [])

    // log('ground grid')

    return (
        <div id={'grid'}>
            {props.grid.map((item, i) => {
                return <div key={i}
                            className={
                                'cell' +
                                // (item.center ? ' center' : '') +
                                (item.x === props.selectedCellX && item.y === props.selectedCellY ? ' selected' : '') +

                                // (' ' + soil[item.soil].type) +

                                ('')
                            }
                            style={{background: grass[item.soil] ? grass[item.soil].color : ''}}
                            onClick={() => props.clickTile(item.x, item.y)}>

                    {item.type && <img src={getImage(item.type).src}
                                       style={{...getImage(item.type).style, border: isCoordinates ? '1px solid red' : ''}}
                    />}

                    {isCoordinates && <div className={'coordinates'}>
                        <div>{item.x}</div>:
                        <div>{item.y}</div>
                    </div>}

                    {/*<img src={getGround().src} style={getGround().style}/>*/}

                </div>
            })}
        </div>
    )
}

export default Grid