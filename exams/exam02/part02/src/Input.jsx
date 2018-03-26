import React from 'react';

function Input(props) {
    
    if (!props.won) return (
        <div className="input">
            <div>
                <input className="user-guess text-input" type="text" maxLength="5"/>
            </div>
            <div>
                <button className="mighty-button" onClick={() => props.submitGuess(document.getElementsByClassName('user-guess')[0].value)}> Guess</button>
            </div>
        </div>
    )
    else return (
        <div className="input">
            <div>
                <input className="user-guess text-input" type="text" disabled="true" placeholder="You got the right word!" />
            </div>
            <div>
                <button className="mighty-button" onClick={() => props.reset()}>Reset</button>
            </div>
        </div>
    )
}

export default Input;