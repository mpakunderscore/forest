import React, {FC, useContext} from "react";

import '../css/mobile.css'
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";
import {Map, User} from "../types";

interface ForestProps {
    // map: Map
    // time: number
    // user: User
}

const Mobile: FC<ForestProps> = ({}) => {

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    const clickYes = () => {
        // location.reload()
    }

    const clickNo = () => {
        // location.reload()
    }

    return (
        <div className={'mobile'}>
            <div className={'list'}>
                <img src={'./red1.png'}/>
                <div className={'form'}>

                    <div className={'text'}>
                        In light of the exponential advancements in AI, should there be legal rights and protections established for advanced, sentient artificial intelligence?
                    </div>
                    <div className={'controls'}>
                        {/*<div className={'button'}><img src={'./button1.png'}/></div>*/}
                        <div className={'button gray'}
                             onClick={clickYes}>YES</div>
                        <div className={'button red'}
                             onClick={clickNo}>NO</div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Mobile;