import React, {FC, useState} from "react";

import '../css/mobile.css'
import {texts} from "./mobile/texts";
import Stats from "./mobile/Stats";

interface MobileProps {}

declare var VERSION: string;

const Mobile: FC<MobileProps> = ({}) => {

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    const [isStats, setStats] = useState(false)

    const clickYes = () => {
        // location.reload()
        setStats(false)
    }

    const clickNo = () => {
        // location.reload()
        setStats(true)
    }

    return (
        <div className={'mobile'}>
            <div className={'list'}>

                <img rel={'preload'} src={'./red2.png'}/>
                <div className={'form'}>

                    <Stats isStats={isStats}/>

                    <div className={'text'}>{texts.first}</div>

                    <div className={'controls'}>
                        <div className={'button gray'} onClick={clickYes}>YES</div>
                        <div className={'button red'} onClick={clickNo}>NO</div>
                    </div>

                    <div className={'version'}>{VERSION.toUpperCase().substring(0, 7)}</div>

                </div>
            </div>
        </div>
    )
}

export default Mobile;