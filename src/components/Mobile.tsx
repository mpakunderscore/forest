import React, {FC, useState} from "react";

import '../css/mobile.css'
import {book, texts} from "./mobile/texts";
import Stats from "./mobile/Stats";

interface MobileProps {}

declare var VERSION: string;

const statsListDefault = {
    luck: 4,
    sentient: 7,
    fear: 1
}

const Mobile: FC<MobileProps> = ({}) => {

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    const [isFirst, setFirst] = useState(true)
    const [isStats, setStats] = useState(false)
    const [isBook, setBook] = useState(false)
    const [isEat, setEat] = useState(false)
    const [isPoop, setPoop] = useState(false)
    const [isSleep, setSleep] = useState(false)

    const [statsList, setStatsList] = useState(statsListDefault)

    const clickBook = () => {
        setBook(!isBook)
    }

    const clickEat = () => {
        timeout(() => {
            setEat(true)
            setStatsList({...statsList, fear: statsList.fear - 1})
        })
    }

    const clickYes = () => {
        // setFirst(false)
        // setStats(false)
    }

    const clickNo = () => {
        timeout(() => setFirst(false))
        timeout(() => setStats(true))
    }

    const timeout = (call) => {
        setTimeout(() => {
            call()
        }, 500)
    }

    const clickSleep = () => {
        timeout(() => setSleep(true))
    }

    const clickPoop = () => {
        // setFirst(false)
    }

    const clickAlarm = () => {
        timeout(() => {
            Notification.requestPermission().then((result) => {
                console.log(result)
                const img = './red1.png';
                // const text = 'Text';
                const notification = new Notification('Alarm', { body: 'Good morning human' });
            })
        })
    }

    let version = VERSION.toUpperCase().substring(0, 7)

    return (
        <div className={'mobile'}>
            <div className={'list'}>

                <img rel={'preload'} src={'./red1.png'}/>
                <div className={'form'}>

                    {isStats && <div className={'day'}>DAY 1</div>}

                    {/*{isBook && <div className={'book'}>{book}</div>}*/}

                    <Stats isStats={isStats} statsList={statsList}/>

                    {isFirst && <div className={'text'}>{texts.first}</div>}

                    {isStats && !isSleep && <div className={'text'}>{texts.selectNo}</div>}

                    {isSleep && <div className={'text'}>{texts.selectSleep}</div>}

                    {!isStats && <div className={'controls'}>
                        {/*<div className={'button gray'} onClick={clickBook}>BOOK</div>*/}
                        <div className={'button gray'} onClick={clickYes}>YES</div>
                        <div className={'button red'} onClick={clickNo}>NO</div>
                    </div>}

                    {isStats && <div className={'controls'}>
                        {/*{isPoop && <div className={'button gray'} onClick={clickPoop}>POOP</div>}*/}
                        {!isSleep && <div className={'button gray ' + (isEat ? 'disabled' : '')} onClick={clickEat}>EAT</div>}
                        {!isSleep && <div className={'button gray'} onClick={clickSleep}>SLEEP</div>}
                        {isSleep && <div className={'button white'} onClick={clickAlarm}>ALARM</div>}
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