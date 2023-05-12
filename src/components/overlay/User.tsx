import React, {useContext, useEffect, useState} from "react";
import {MapContext} from "../../context/MapContext";
import {UserContext} from "../../context/UserContext";

const User = (props) => {

    const {username} = useContext(UserContext)

    useEffect(() => {

    }, [username])

    return (
        <div className={'user'}>
            <div>
                <div className={'text'}>
                    <div className={'row'}>
                        <div>Name</div>
                        <div>{username}</div>
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

export default User