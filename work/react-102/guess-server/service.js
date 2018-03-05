const wordlist = require('./wordlist');

function getSecretId(){
    return Math.floor( Math.random() * wordlist.length );
}

function process ( guess, id ){
    guess=guess.toUpperCase();
    id=+id;
    let res = {};

    if (!checkId(id)){
        res.error='id not valid';
    }

    if (!checkGuess(guess)){
        if (res.error) res.error+=' and guess not valid';
        else res.error=guess+' is not a valid guess';
    }   
    
    res.seenGuess=guess;
    res.seenId=id;

    if (res.error) return res;

    const word=wordlist[id];
    let count=0;

    res.won = (guess===word)? true:false;
    if (res.won){
        res.match=5;
        return res;
    }

    const map={};  
    for (let i=0;i<5;++i){
        if (word[i] === guess[i]) ++count;
        else{
            if (!map[word[i]]) map[word[i]] = 0;        
            if (!map[guess[i]]) map[guess[i]] = 0;
  
            if (map[word[i]] < 0 ) ++count;
            if (map[guess[i]] > 0) ++count;
            ++map[word[i]];
            --map[guess[i]];
        }
    }
    res.match=count;    
    return res;
}

function checkGuess(guess){
    if ( !guess || !guess.match(/[A-Z]{5}/)) return false;
    return true;
}

function checkId(id){
    if ( +id<0 || +id>=wordlist.length ) return false;
    return true;
}

function fullList(){
    return wordlist;
}

module.exports={
    getSecretId : getSecretId,
    process : process,
    fullList : fullList
}