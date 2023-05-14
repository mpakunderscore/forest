import React, {useContext} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";
const song = new Audio('./ambient.mp3');

const Controls = (props) => {

    const {cellSize, setCellSize, isCoordinates, showCoordinates, centerView} = useContext(MapContext)
    const {isSound, setSound, selectedItem} = useContext(UserContext)

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

            <div className={'time'} onClick={() => {
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
                if (cellSize < 80) {
                    setCellSize(cellSize + 10)
                    if (selectedItem)
                        centerView(selectedItem)
                }
            }}>+
            </div>

            <div className={(document.fullscreenElement ? 'active' : '')}
                 onClick={() => {
                     toggleFullScreen()
                 }}>FS
            </div>

            <div className={(isSound ? 'active' : '')}
                 onClick={() => {
                     setSound(!isSound)
                     if (!isSound)
                         song.play()
                     else
                         song.pause()
                 }}>{isSound ? '+' : ''}🎵
            </div>

            <div className={(isCoordinates ? 'active' : '')}
                 onClick={() => {
                     showCoordinates(!isCoordinates)
                 }}>DG
            </div>

            <div className={('')}
                 onClick={() => {
                     // console.log(userItems)
                     if (props.user.userItems.length > 0)
                        centerView(props.user.userItems[0])
                 }}>Home
            </div>

        </div>
    )
}

export default Controls