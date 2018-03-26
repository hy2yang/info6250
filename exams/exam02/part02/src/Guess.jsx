import React, { Component } from 'react';
import './guess-app.css';
import Control from './Control'
import Banner from './Banner'
import History from './History'
import Message from './Message'

const connection = require('./connection');
const roles = require('./config.json');


class Guess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameId : this.props.gameId,
            winner : "",
            won: false,
            round :0,
            alfredSecret:"",
            alfredID: -1,
            alfredHistory : [],
            barbaraSecret :"",
            barbaraID: -1,
            barbaraHistory : [],
            error : null
        };        
                
    }

    componentDidMount(){
        //this.startGame();
    }

    async startGame(){
        await this.getSecrets();
    }

    getSecrets(){
        for (let i in roles){
            connection.fetchJsonFrom(roles[i]+'/game', 'post')
            .then(json => {
                this.setState(
                    { 
                        [i+'Secret'] : json.secret,
                        [i+'ID'] : json.id,
                    }
                );
            })
            .catch(e => this.handleError(e));
        }
    }

    handleError(e){
        this.setState( {error: e} );
    }
    /*
    submitGuess(guess){
        this.setState( {error:null} );
        document.getElementsByClassName("user-guess")[0].value='';
        submit(guess, this.state.secrectId).then(result => this.handleGuess(result)).catch(e => this.handleError(e));
    }
    */
    handleGuess(response){        
        if (!response.error){
            this.state.history.push(response);
            this.setState({round : this.state.round+1});
            if (response.won) this.setState({ won: true});
        }
        else{
            this.setState( {error: response.error} );
        }         
    }

    reset(){        
        this.setState({
            secrectId: null,
            won: false,
            round :0,
            history : [],
            error : null
        });
        this.fetchId();
        console.log("the secret word id is "+this.state.secrectId);
    }

    render(){ 
        const errorMessage=this.state.error? (<Message error={this.state.error} />) : null;
        const aSecret=this.state.alfredSecret? "Alfred's secret is "+this.state.alfredSecret:"Alfred haven't chosen a secret";
        const bSecret=this.state.barbaraSecret? "Barbara's secret is "+this.state.barbaraSecret:"Barbara haven't chosen a secret";
        return (
            <div className="game">
                {errorMessage}
                <Banner winner={this.state.winner}/>
                <Control won={this.state.won} start={()=>this.startGame()} reset={()=>this.props.reset()}/>

                <div className="history">
                    <div id="alfred">
                        <div>{aSecret}</div>
                        <History steps={this.state.alfredHistory} />
                    </div>  
                    <div id="barbara"> 
                        <div>{bSecret}</div>
                        <History steps={this.state.barbaraHistory} /> 
                    </div>
                </div>
                

            </div>
        );
    }
}

export default Guess;