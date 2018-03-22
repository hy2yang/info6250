const wordlist = require('./wordlist');

function getSecretId(){
    let id=Math.floor( Math.random() * wordlist.length );
    console.log(wordlist[id]);
    return id;
}

function process ( guess, id ){
    guess=guess.toUpperCase();
    id=+id;
    let res = {};

    checkId(id, res);
    checkGuess(guess, res);
    
    res.seenGuess=guess;
    res.seenId=id;

    if (res.error) return res;
       
    return count(guess, wordlist[id], res);
}

function checkGuess(guess, res){
    if ( !guess || !guess.match(/[A-Z]{5}/)) {
        if (res.error) res.error+=' and guess not valid';
        else res.error=guess+' is not a valid guess';
    }
    return res;
}

function checkId(id, res){
    if ( +id<0 || +id>=wordlist.length ){
        res.error='id not valid';
    }
    return res;
}

function count(guess, word, res){
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

function fullList(){
    return wordlist;
}

module.exports={
    getSecretId : getSecretId,
    process : process,
    fullList : fullList
}