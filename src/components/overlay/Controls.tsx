import React, {useContext} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const Controls = (props) => {

    const {cellSize, setCellSize, isCoordinates, showCoordinates, centerView} = useContext(MapContext)
    const {userItems, isSound, setSound, selectedItem} = useContext(UserContext)

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
                if (cellSize > 10) {
                    setCellSize(cellSize - 10)
                    if (selectedItem)
                        centerView(selectedItem)
                }
            }}>-
            </div>

            <div onClick={() => {
            }}>{cellSize}</div>

            <div onClick={() => {
                if (cellSize < 60) {
                    setCellSize(cellSize + 10)
                    if (selectedItem)
                        centerView(selectedItem)
                }
            }}>+
            </div>

            <div className={(document.fullscreenElement ? 'active' : '')}
                 onClick={() => {
                     toggleFullScreen()
                 }}>Fullscreen
            </div>

            <div className={(isCoordinates ? 'active' : '')}
                 onClick={() => {
                     showCoordinates(!isCoordinates)
                 }}>Debug
            </div>

            <div className={(isSound ? 'active' : '')}
                 onClick={() => {
                     setSound(!isSound)
                 }}>Sound
            </div>

            <div className={('')}
                 onClick={() => {
                     centerView(userItems[0])
                 }}>Home
            </div>

        </div>
    )
}

export default Controls