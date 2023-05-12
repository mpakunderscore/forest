import React, {useContext, useEffect, useState} from "react";
import Controls from "./Controls";
import ItemView from "./ItemView";

import {UserContext} from "../../context/UserContext";
import Welcome from "./Welcome";
import User from "./User";
import {useChangePosition} from "./Keyboard";

const Overlay = (props) => {

    useChangePosition()
    const {username, selectedItem} = useContext(UserContext)
    const [isWelcome, setWelcome] = useState(true)

    return (
        <div className={'overlay'}>

            {isWelcome && !username && <Welcome setWelcome={setWelcome}/>}

            {/*<Inventory/>*/}

            {username && <User/>}

            {selectedItem && <ItemView map={props.map}/>}

            <Controls time={props.time}/>

        </div>)
}

export default Overlay