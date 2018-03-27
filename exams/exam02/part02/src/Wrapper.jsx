import React, { Component }from 'react';
import Guess from './Guess';

class Wrapper extends Component {

    constructor() {
        super();
        this.state = {
            gameNum : 0
        };       
    }
    
    resetGame(){
        this.setState( {gameNum : this.state.gameNum+1} );
    }

    render () {
        return (
        <div className="wrapper" key={this.state.gameNum}>
            <Guess reset={()=>this.resetGame()}/> 
        </div>
        );
    }

}

export default Wrapper;