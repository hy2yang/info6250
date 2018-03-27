import React, { Component }from 'react';

class History extends Component {
    
    render(){
        const list =[];
        if (this.props.steps && this.props.matched){
            for (let i in this.props.matched){
                list.push(
                    (
                        <li key={i} className="attempt">
                            {this.props.steps[i]} ---- {this.props.matched[i]} matching letters 
                        </li>
                    )
                );
            }
        }        
        
        return(
            <div className="list">            
                <ol>{list}</ol>    
            </div>
        );
    }

}

export default History;