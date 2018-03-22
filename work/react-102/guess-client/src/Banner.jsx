import React, { Component } from 'react';

class Banner extends Component {
    
    render(){
        if (this.props.won){
            return (
                <h2 className="banner">
                Congradulations! you have won!
                </h2>
            );
        }
        return (
            <h2 className="banner">
                a secret word is chosen, input your guess (5 letters case insensitive) below
            </h2>
        );
    }

}

export default Banner;