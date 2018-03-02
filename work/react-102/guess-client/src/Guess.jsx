import React, { Component } from 'react';
import './guess-app.css';
import  {chooseSecret, calculate} from './service'
import Input from './Input'
import Banner from './Banner'
import History from './History'

class guess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secrect: chooseSecret(),
            won: false,
            round :0,
            history : [],
        };
        console.log("the secret word is "+this.state.secrect);        
    }

    handleGuess(guess){
        document.getElementsByClassName('user-guess')[0].value='';
        let step = calculate(guess, this.state.secrect);
        this.state.history.push(step);
        this.setState({round : this.state.round+1});
        if (step.won) this.setState({ won: true});        
    }

    reset(){        
        this.setState({
            secrect: chooseSecret(),
            won: false,
            round :0,
            history : []
        });
        console.log("the secret word is "+this.state.secrect);
    }

    render(){        
        return (
            <div className="game">
                <Banner won={this.state.won} />
                <Input won={this.state.won} submitGuess={(guess)=>this.handleGuess(guess)} reset={()=>this.props.reset()}/>
                <History steps={this.state.history} />    
            </div>
        );
    }
}

export default guess;