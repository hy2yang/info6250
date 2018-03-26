import React, { Component }from 'react';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps : this.props.steps
        };
    }

    render(){  
        
        const list=this.state.steps.map( (step, index) => {
            return (
                <li key={index} className="attempt">
                    {step.seenGuess} ---- {step.match} matching letters 
                </li>
            )
        });
        return(
            <div className="list">            
                <ol>{list}</ol>    
            </div>
        );
    }

}

export default History;