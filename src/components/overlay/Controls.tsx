import React from "react";

const Controls = (props) => {

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
                    props.setCellSize(props.cellSize - 10)
            }}>-
            </div>

            <div onClick={() => {
            }}>{props.cellSize}</div>

            <div onClick={() => {
                if (props.cellSize < 60)
                    props.setCellSize(props.cellSize + 10)
            }}>+
            </div>

            <div onClick={() => {
                toggleFullScreen()
            }}>FS
            </div>

            <div onClick={() => {
                props.showCoordinates(!props.isCoordinates)
            }}>C
            </div>

            <div onClick={() => {
                props.showCoordinates(!props.isCoordinates)
            }}>S
            </div>

        </div>
    )
}

export default Controls