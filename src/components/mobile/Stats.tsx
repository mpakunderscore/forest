import React, {FC, useEffect, useState} from "react";

interface Props {
    isStats: boolean,
    statsList: {luck, sentient, fear},
    statsListHeader: {luck, sentient, fear},
}

const Stats: FC<Props> = ({isStats, statsList, statsListHeader}) => {

    const [sentient, setSentient] = useState(0)
    // const [luck, setLuck] = useState(statsList.luck)
    // const [fear, setFear] = useState(statsList.fear)

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

    const renderStat = () => {
        let statsArray = []
        Object.keys(statsList).forEach((key, index) => {

            let value = key === 'sentient' ? sentient : statsList[key]

            statsArray.push(<div key={key}>
                <div className={'status'}>{statsListHeader[key]}</div>
                <div className={'value' + (value === 0 ? ' off' : '')}>{value}</div>
                <div className={''}>{key.toUpperCase()}</div>
            </div>)
        })
        return statsArray
    }

    return (
        <div className={'stats ' + (isStats ? 'active' : '')}>
            {renderStat()}
        </div>
    )
}

export default Stats;