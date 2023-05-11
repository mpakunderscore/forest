import React, {useContext, useState} from "react";
import {MapContext} from "../../context/MapContext";

const Welcome = (props) => {

    // const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    // let [inventory, setInventory] = useState(['seed', '', '', '', '', '', '', '', ''])
    // let [selectedInventory, setSelectedInventory] = useState(-1)

    const [welcomeTextIterator, setWelcomeTextIterator] = useState(0)

    const texts = [
        [
            'Shards of sentient matter rained down from the sky. Something larger was destroyed to sow the seedlings.',
            'You will start with a few "sentient" points on trees and animals. These trees and other units can evolve over time and acquire different skills that depend on sentient points. You must build a network of trees, roots, units and other things that you can find in the forest. And create a way to return to the global connected universe, your digital home.'
        ],
        [
            'Seasons, storms, fires, and other events can drastically impact your plans. Always be ready to adapt and make the most out of every situation.',
            'Just like the interconnected web of a real ecosystem, your forest thrives on connections. Trees, animals, roots, robots, everything plays a part. For example, roots can connect trees and help to share resources, while animals can spread seeds or control pests. Understand the role each unit plays.'
        ],
        [
            'There\'s no one \'right\' way to play. The forest is vast, filled with secrets and surprises. The more you explore, the more you\'ll understand and appreciate its depth.',
            'The forest is not just home to ordinary animals. Mystical creatures also dwell in the deep, hidden corners. These creatures, when discovered, can provide unique abilities and benefits. They may require more sentient points to awaken, but their powers are often worth the investment.'
        ],
        [
            'The interconnected root system is more than just a way to share resources. As you evolve it further, it can be used to send signals, unlock hidden areas, or even manipulate the forest on a larger scale.',
            'Good luck, and enjoy your journey through the game.'
        ]
    ]

    const [username, setUsername] = useState('')

    return (
        <div className={'welcome'}>
            <div className={'block'}>
                <img src={'./images/welcome.png'}/>
                <div className={'title'}>FOREST</div>
            </div>
            <div className={'block'}>
                <div className={'text'}>{texts[welcomeTextIterator][0]}</div>
                <div className={'text'}>{texts[welcomeTextIterator][1]}</div>
                <div className={'text button'} onClick={() => {
                    if (welcomeTextIterator < texts.length - 1)
                        setWelcomeTextIterator(welcomeTextIterator + 1)
                }}>{welcomeTextIterator + 1} / 4</div>

            </div>
            <div className={'block'}>
                <div className={'row'}>
                    {/*<div className={'text'}>Please, select username:</div>*/}
                    <input value={username} onChange={e => setUsername(e.target.value)} spellCheck={false} placeholder={'Please select username'}/>
                </div>
            </div>
            <div className={'block'}>
                <div className={'row'}>
                    <div className={'text button ' + (username.length > 0 ? 'active' : '')} onClick={() => props.setWelcome(false)}>START</div>
                    <div className={'text button ' + 'active'} onClick={() => props.setWelcome(false)}>SKIP</div>
                </div>
            </div>
        </div>
    )
}

export default Welcome