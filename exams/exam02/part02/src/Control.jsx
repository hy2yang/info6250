import React from 'react';

function Control(props) {

    const text = props.won? "New Game":"Start";

    return (
        <div className="control">
            <div>
                <button className="mighty-button" disabled={props.running&&!props.error} 
                onClick={() => props.won? props.reset():props.start()}>
                {text}
                </button>
            </div>
        </div>
    )
}

export default Control;