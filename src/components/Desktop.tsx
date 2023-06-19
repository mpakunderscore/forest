import React, {FC, useContext} from "react";

import '../css/desktop.css'
import {UserContext} from "../context/UserContext";
import {MapContext} from "../context/MapContext";
import {Map, User} from "../types";

interface ForestProps {
    // map: Map
    // time: number
    // user: User
}

const Desktop: FC<ForestProps> = ({}) => {

    return (
        <div className={'desktop'}>
            <span className={'red'}>RED</span>
            <span className={''}>FOREST</span>
        </div>
    )
}

export default Desktop;