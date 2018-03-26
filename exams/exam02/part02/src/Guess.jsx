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
            winner : "",
            running : false,
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
        this.setState({running:true, error:null});
        await this.getSecrets();
    }

    getSecrets(){
        for (let i in roles){
            connection.fetchJsonFrom(roles[i]+'/game', 'post', {})
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

    render(){ 
        const errorMessage=this.state.error? (<Message error={this.state.error} />) : null;
        const aSecret=this.state.alfredSecret? "Alfred's secret is "+this.state.alfredSecret:"Alfred haven't chosen a secret";
        const bSecret=this.state.barbaraSecret? "Barbara's secret is "+this.state.barbaraSecret:"Barbara haven't chosen a secret";
        return (
            <div className="game">
                {errorMessage}
                <Banner winner={this.state.winner}/>
                <Control running={this.state.running} error={this.state.error? true:false}
                start={()=>this.startGame()} reset={()=>this.props.reset()}/>

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