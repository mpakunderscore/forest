import React, {useContext, useEffect} from "react";
import {MapContext} from "../../../../context/MapContext";
import {UserContext} from "../../../../context/UserContext";
const song = new Audio('./ambient.mp3');

const Controls = (props) => {

    const {cellSize, setCellSize, changeCellSize, isCoordinates, showCoordinates, centerView} = useContext(MapContext)
    const {isSound, setSound, selectedItem, setSelectedItem} = useContext(UserContext)

    // console.log(cellSize)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    // console.log(props.time)
    //
    // useEffect(() => {
    //
    // }, [props.time])

    return (
        <div className={'controls'}>

            <div className={(isSound ? 'active' : '')}
                 onClick={() => {
                     setSound(!isSound)
                     if (!isSound)
                         song.play()
                     else
                         song.pause()
                 }}>{isSound ? '+' : ''}🎵
            </div>

            <div className={'time'} onClick={() => {
            }}>{props.time}</div>

            <div onClick={() => {
                if (cellSize > 40) {
                    changeCellSize(10)
                }
            }}>-
            </div>

            <div onClick={() => {
            }}>{cellSize}</div>

            <div onClick={() => {
                if (cellSize < 80) {
                    changeCellSize(-10)
                }
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
                 }}>D
            </div>

            <div className={(props.isWelcome ? 'active' : '')}
                 onClick={() => {
                     props.setWelcome(!props.isWelcome)
                 }}>W
            </div>

            <div className={('')}
                 onClick={() => {
                     // console.log(userItems)
                     if (props.user.userItems.length > 0) {
                         centerView(props.user.userItems[0], cellSize)
                         setSelectedItem(props.user.userItems[0])
                     }

                 }}>Home
            </div>

        </div>
    )
}

export default Controls