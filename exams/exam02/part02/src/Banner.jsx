import React, { Component } from 'react';

class Banner extends Component {
    
    render(){
        let text;
        if (!this.props.winner){
            text ='Welcome to word guess computer vs computer! Click button to start';
        }
        else {
           text ='Winner is '+this.props.winner+ '! Click button to reset';
        }

        return (
            <h2 className="banner">
            {text}
            </h2>
        );
    }

}

export default Banner;