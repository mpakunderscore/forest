import React, {useContext} from "react";
import {MapContext} from "../../context/MapContext";

const Controls = (props) => {

    const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    // console.log(cellSize)

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
                if (cellSize > 10)
                    setCellSize(cellSize - 10)
            }}>-
            </div>

            <div onClick={() => {
            }}>{cellSize}</div>

            <div onClick={() => {
                if (cellSize < 60)
                    setCellSize(cellSize + 10)
            }}>+
            </div>

            <div className={(document.fullscreenElement ? 'active' : '')}
                 onClick={() => {
                     toggleFullScreen()
                 }}>FS
            </div>

            <div className={(isCoordinates ? 'active' : '')}
                 onClick={() => {
                     showCoordinates(!isCoordinates)
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