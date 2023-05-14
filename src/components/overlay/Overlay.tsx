import React, {useContext, useEffect, useState} from "react";
import Controls from "./Controls";
import Entity from "./Entity";

import {UserContext} from "../../context/UserContext";
import Welcome from "./Welcome";
import User from "./User";
import {useChangePosition} from "./Keyboard";

const Overlay = (props) => {

    useChangePosition({setWelcome: () => setWelcome(false)})
    const {username, selectedItem} = useContext(UserContext)
    const [isWelcome, setWelcome] = useState(true)

    return (
        <div className={'overlay'}>

            {isWelcome && !username && <Welcome setWelcome={setWelcome}/>}

            {/*<Inventory/>*/}

            {username && <User/>}

            {selectedItem && <Entity map={props.map} user={props.user}/>}

            <Controls time={props.time} user={props.user}/>

        </div>)
}

export default Overlay