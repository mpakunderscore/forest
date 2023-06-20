import React, {FC, useEffect, useState} from "react";

interface Props {
    isStats: boolean
}

const statsList = {
    luck: 4,
    sentient: 7,
    fear: 1
}

const Stats: FC<Props> = ({isStats}) => {

    const [luck, setLuck] = useState(4)
    const [sentient, setSentient] = useState(0)
    const [fear, setFear] = useState(1)

    const setDigitsGrow = () => {
        setOneGrow()
    }

    const setOneGrow = () => {
        setTimeout(() => {
            setSentient(sentient => {
                if (sentient < statsList.sentient) {
                    setOneGrow()
                    return sentient + 1
                } else return sentient
            })
        }, 100)
    }

    useEffect(() => {
        if (isStats) {
            setSentient(0)
            setDigitsGrow()
        }
    }, [isStats])

    return (
        <div className={'stats ' + (isStats ? 'active' : '')}>
            <div>
                <div>0 / 100</div>
                <div className={'value'}>{luck}</div>
                <div>LUCK</div>
            </div>
            <div>
                <div>Estimate</div>
                <div className={'value'}>{sentient}</div>
                <div>SENTIENT</div>
            </div>
            <div>
                <div>Growing</div>
                <div className={'value'}>{fear}</div>
                <div>FEAR</div>
            </div>
            {/*<div>*/}
            {/*    <div>Always</div>*/}
            {/*    <div className={'value'}>3</div>*/}
            {/*    <div>{'anxiety'.toUpperCase()}</div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Stats;