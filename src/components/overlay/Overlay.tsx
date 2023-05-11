import React, {useContext, useEffect, useState} from "react";
import Controls from "./Controls";
import ItemView from "./ItemView";

import {UserContext} from "../../context/UserContext";
import Welcome from "./Welcome";
import Username from "./Username";
import {useChangePosition} from "./Keyboard";

const Overlay = (props) => {

    useChangePosition()
    const {selectedItem} = useContext(UserContext)
    const [isWelcome, setWelcome] = useState(true)

    return (
        <div className={'overlay'}>

            {isWelcome && <Welcome setWelcome={setWelcome}/>}

            {/*<Inventory/>*/}

            <Username/>

            {selectedItem && <ItemView map={props.map}/>}

            <Controls time={props.time}/>

        </div>)
}

export default Overlay