import React, { Component }from 'react';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history : this.props.steps
        };
    }

    render(){
        const list=this.state.history.map( (step, index) => {
            return (
                <li key={index} className="attempt">
                    {step.guess} ---- {step.match} matching letters 
                </li>
            )
        });
        return(
            <div>            
                <ol>{list}</ol>    
            </div>
        );
    }

}

export default History;