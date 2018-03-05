import React, { Component } from 'react';
import './guess-app.css';
import  {getId, submit} from './connectService'
import Input from './Input'
import Banner from './Banner'
import History from './History'
import Message from './Message'

class Guess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secrectId: null,
            won: false,
            round :0,
            history : [],
            error : null
        };
        this.fetchId();
                
    }

    fetchId(){
        getId()
        .then(id => {this.setState({secrectId: id}); console.log("the secret word id is "+this.state.secrectId);})
        .catch(e => this.handleError(e));
    }

    handleError(e){
        this.setState( {error: e} );
    }

    submitGuess(guess){
        this.setState( {error:null} );
        document.getElementsByClassName('user-guess')[0].value='';
        submit(guess, this.state.secrectId).then(result => this.handleGuess(result)).catch(e => this.handleError(e));
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
        return (
            <div className="game">
                {errorMessage}
                <Banner won={this.state.won} />
                <Input won={this.state.won} submitGuess={(guess)=>this.submitGuess(guess)} reset={()=>this.props.reset()}/>
                <History steps={this.state.history} />    
            </div>
        );
    }
}

export default Guess;