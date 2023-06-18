import React, {FC, useContext} from "react";

import '../css/red.css'
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";
import {Map, User} from "../types";

interface ForestProps {
    map: Map
    time: number
    user: User
}

const Red: FC<ForestProps> = ({user, time, map}) => {

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    return (
        <div className={'red'}>
            <div className={'list'}>
                <img src={'./red1.png'}/>
                <div className={'form'}>
                    <div className={'text'}>
                        In light of the exponential advancements in AI, should there be legal rights and protections established for advanced, sentient artificial intelligence?
                    </div>
                    <div className={'controls'}>
                        {/*<div className={'button'}><img src={'./button1.png'}/></div>*/}
                        <div className={'button gray'}>YES</div>
                        <div className={'button'} onClick={toggleFullScreen}>NO</div>
                        {/*<div className={'button'}><img src={'./button2.png'}/></div>*/}
                        {/*<div className={'button'} onClick={toggleFullScreen}><img src={'./button3.png'}/></div>*/}
                        {/*<div className={'button'}><img src={'./button4.png'}/></div>*/}
                        {/*<div className={'button'}><img src={'./button5.png'}/></div>*/}
                        {/*<div className={'button'}><img src={'./button6.png'}/></div>*/}
                        {/*<div className={'button'}><img src={'./button7.png'}/></div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Red;