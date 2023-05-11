import React, {useState} from "react";

const Username = (props) => {

    return (
        <div className={'username'}>
            <div>
                <div className={'text'}>
                    <div className={'row'}>
                        <div>Name</div>
                        <div>{''}</div>
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