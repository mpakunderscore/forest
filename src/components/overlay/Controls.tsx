import React, {useContext} from "react";
import {MapContext} from "../MapContext";

const Controls = (props) => {

    const { cellSize, setCellSize } = useContext(MapContext)

    console.log(cellSize)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    return (
        <div className={'controls'}>

            <div onClick={() => {
            }}>{props.time}</div>

            <div onClick={() => {
                if (props.cellSize > 10)
                    setCellSize(props.cellSize - 10)
            }}>-
            </div>

            <div onClick={() => {
            }}>{cellSize}</div>

            <div onClick={() => {
                if (props.cellSize < 60)
                    setCellSize(props.cellSize + 10)
            }}>+
            </div>

            <div className={(document.fullscreenElement ? 'active' : '')}
                 onClick={() => {
                     toggleFullScreen()
                 }}>FS
            </div>

            <div className={(props.isCoordinates ? 'active' : '')}
                 onClick={() => {
                     props.showCoordinates(!props.isCoordinates)
                 }}>DG
            </div>

            <div className={(document.fullscreenElement ? 'active' : '')}
                 onClick={() => {
                     // props.showCoordinates(!props.isCoordinates)

                 }}>SD
            </div>

        </div>
    )
}

export default Controls