import React, {FC, useState} from "react";

import '../css/mobile.css'
import {book, texts} from "./mobile/texts";
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
    const [isBook, setBook] = useState(false)

    const clickBook = () => {
        setBook(!isBook)
    }

    const clickYes = () => {
        // location.reload()
        setStats(false)
    }

    const clickNo = () => {
        // location.reload()
        setStats(true)
    }

    let version = VERSION.toUpperCase().substring(0, 7)

    return (
        <div className={'mobile'}>
            <div className={'list'}>

                <img rel={'preload'} src={'./red1.png'}/>
                <div className={'form'}>

                    {isStats && <div className={'day'}>DAY 1</div>}

                    {/*{isBook && <div className={'book'}>{book}</div>}*/}

                    <Stats isStats={isStats}/>

                    {!isStats && <div className={'text'}>{texts.first}</div>}

                    {isStats && <div className={'text'}>{texts.selectNo}</div>}

                    {!isStats && <div className={'controls'}>
                        {/*<div className={'button gray'} onClick={clickBook}>BOOK</div>*/}
                        <div className={'button gray'} onClick={clickYes}>YES</div>
                        <div className={'button red'} onClick={clickNo}>NO</div>
                    </div>}

                    {isStats && <div className={'controls'}>
                        {/*<div className={'button gray'} onClick={clickBook}>BOOK</div>*/}
                        <div className={'button gray'} onClick={clickYes}>POOP</div>
                        <div className={'button gray'} onClick={clickNo}>SLEEP</div>
                    </div>}

                    <div className={'version'}
                         onClick={() => navigator.clipboard.writeText(version)}>
                        {version}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Mobile;