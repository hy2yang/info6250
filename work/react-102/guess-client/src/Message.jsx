import React, { Component } from 'react';
import './message.css';

class Message extends Component {
    
    render(){
        return (
            <h2 className="error-message">
                {this.props.error}
            </h2>
        );
    }

}

export default Message;