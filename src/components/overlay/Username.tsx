import React, {useState} from "react";

const Username = (props) => {

    // const {cellSize, setCellSize, isCoordinates, showCoordinates} = useContext(MapContext)

    let [inventory, setInventory] = useState(['seed', '', '', '', '', '', '', '', ''])
    let [selectedInventory, setSelectedInventory] = useState(-1)

    return (
        <div className={'username'}>
            <div>
                <div className={'text'}>
                    <div className={'row'}>
                        <div>Name</div>
                        <div>{'mpakunderscore'}</div>
                    </div>
                    <div className={'row'}>
                        <div>Sentient</div>
                        <div>{10}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className={'text item-items'}>
                    <div className={'row'}>
                        <div>Trees</div>
                        <div>{2}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Username