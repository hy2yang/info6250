import React, { Component }from 'react';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps : this.props.steps,
            matched : this.props.matched
        };
    }

    render(){  
        
        const list=this.props.steps.map( (step, index) => {
            return (
                <li key={index} className="attempt">
                    {step} ---- {index} matching letters 
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