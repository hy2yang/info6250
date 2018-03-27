import React, { Component }from 'react';

class History extends Component {
    
    render(){  
        const list =[];
        for (let i in this.props.steps){
            list.push(
                (
                    <li key={i} className="attempt">
                        {this.props.steps[i]} ---- {this.props.matched[i]} matching letters 
                    </li>
                )
            );
        }
        
        return(
            <div className="list">            
                <ol>{list}</ol>    
            </div>
        );
    }

}

export default History;