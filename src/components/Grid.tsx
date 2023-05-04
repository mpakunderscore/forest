import React, {useEffect, useState} from "react";
import {createGesture} from "@ionic/react";
import {grass} from "./utils/ground";
import {log} from "../utils/log";

const Grid = (props) => {

    useEffect(() => {

    }, [])

    // log('render grid')

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

                    {item.img && <img src={item.img.src} style={
                        {...item.img.style,
                            border: props.isCoordinates ? '1px solid red' : ''
                        }}/>}

                    {props.isCoordinates && <div className={'coordinates'}>
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