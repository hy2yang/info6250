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
        //const ActiveGame = this.state.game;
        return (
        <div className="wrapper" key={this.state.gameNum}>
            <Guess gameId={this.state.gameNum} reset={()=>this.resetGame()}/> 
        </div>
        );
    }

}

export default Wrapper;