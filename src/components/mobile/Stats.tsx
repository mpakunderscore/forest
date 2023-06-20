import React, {FC, useEffect, useState} from "react";

interface Props {
    isStats: boolean,
    statsList: {luck, sentient, fear}
}

const Stats: FC<Props> = ({isStats, statsList}) => {

    const [luck, setLuck] = useState(statsList.luck)
    const [sentient, setSentient] = useState(0)
    const [fear, setFear] = useState(statsList.fear)

    const setDigitsGrow = () => {
        setOneGrow()
    }

    const setOneGrow = (timeout = 100) => {
        setTimeout(() => {
            setSentient(sentient => {
                if (sentient < statsList.sentient) {
                    setOneGrow(timeout + sentient * 10)
                    return sentient + 1
                } else return sentient
            })
        }, timeout)
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
                <div className={'value'}>{statsList.fear}</div>
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