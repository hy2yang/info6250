import React, { Component } from 'react';
import './guess-app.css';
import Control from './Control'
import Banner from './Banner'
import History from './History'
import Message from './Message'

const connection = require('./connection');
const roles = require('./config.json');
const nameArray = Object.keys(roles);

class Guess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            winner : "",
            running : false,
            record : {},
            guessed : {},
            matched : {},
            error : null
        }; 
        
        this.reset = async function(){
            await this.deleteGamesInServers();
            this.props.reset();
        }
                
    }

    async startGame(){
        this.setState( {running:true, error:null} );
        await this.getSecrets();

        let index = 0;
        
        while (!this.state.winner){
            index = await this.alternate(index);
            //console.log(this.state);
        }
    }

    async alternate(index){
        const target = nameArray[index];
        const myMatched = this.state.matched[target];
        const lastmatch = {};
        if (myMatched){
            lastmatch.matched = myMatched[myMatched.length-1];
        }
        //console.log(lastmatch);
        const newGuess = await this.getGuess(index, lastmatch);
        await this.checkGuess(1-index, newGuess);
        return (1-index);
    }

    async getSecrets(){
        const newRecord = Object.assign({}, this.state.record);
        try {
            for (let i in roles){
                newRecord[i] = await connection.fetchJsonFrom(roles[i]+'/game', 'post', {});                
            }
            this.setState({record : newRecord});            
        }
        catch(e){ 
            this.handleError(e);
        }
    }

    async getGuess(targetIndex, matched){
        const target = nameArray[targetIndex];
        const path = roles[target]+'/game/'+this.state.record[target].id+'/guessed';
        
        let newList, newGuess;
        if (this.state.guessed[target]){
            newList = this.state.guessed[target].slice(0);
        }
        else newList = [];

        try {
            newGuess = await connection.fetchJsonFrom(path, 'put', matched);
            newList.push(newGuess.guess);
            const newGuessed = Object.assign({}, this.state.guessed);
            newGuessed[target] = newList;
            this.setState({guessed : newGuessed});//,()=>console.log(this.state.guessed));            
        }
        catch(e){ 
            this.handleError(e);
        }
        return newGuess.guess;
        
    }

    async checkGuess(targetIndex, guess){
        const target = nameArray[targetIndex];
        const opponent = nameArray[1-targetIndex];
        const path = roles[target]+'/game/'+this.state.record[target].id+'/guess/'+guess;

        let newList;
        if (this.state.matched[opponent]){
            newList = this.state.matched[opponent].slice(0);
        }
        else newList = [];
        try{
            const res = await connection.getJsonFrom(path);
            newList.push(+res.matched);
            const newMatched = Object.assign({}, this.state.matched);
            newMatched[opponent]=newList;
            this.setState({
                winner : res.hasWon? opponent:"",
                running : res.hasWon? false:true,
                matched : newMatched
            });
        }
        catch(e){ 
            this.handleError(e);
        }       

    }

    async deleteGamesInServers(){
        try {
            for (let i in roles){
                let path = roles[i]+'/game/'+this.state.record[i].id;
                await connection.fetchJsonFrom(path, 'delete', {});                
            }       
        }
        catch(e){ 
            console.log(e);
        }

    }

    handleError(e){        
        this.setState( {error: e} );
    }

    render(){ 
        const errorMessage=this.state.error? (<Message error={this.state.error} />) : null;
        const aSecret=this.state.record['alfred']? "Alfred's secret is "+this.state.record['alfred'].secret:"Alfred haven't chosen a secret";
        const bSecret=this.state.record['barbara']? "Barbara's secret is "+this.state.record['barbara'].secret:"Barbara haven't chosen a secret";
        const aGuessed = this.state.guessed['alfred']? this.state.guessed['alfred']:[];
        const aMatched = this.state.matched['alfred']? this.state.matched['alfred']:[];
        const bGuessed = this.state.guessed['barbara']? this.state.guessed['barbara']:[];
        const bMatched = this.state.matched['barbara']? this.state.matched['barbara']:[];
        return (
            <div className="game">
                {errorMessage}
                <Banner winner={this.state.winner}/>
                <Control running={this.state.running} error={this.state.error? true:false}
                start={()=>this.startGame()} reset={()=>this.reset()} won={this.state.winner? true:false}/>

                <div className="history">
                    <div id="alfred">
                        <div>{aSecret}</div>
                        <History steps={aGuessed} matched={aMatched}/>
                    </div>  
                    <div id="barbara"> 
                        <div>{bSecret}</div>
                        <History steps={bGuessed} matched={bMatched}/> 
                    </div>
                </div>
                

            </div>
        );
    }
}

export default Guess;