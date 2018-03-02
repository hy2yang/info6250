import wordlist from './wordlist';

export function calculate ( guess, word ){
    guess=guess.toUpperCase();
    let res = {};
    res.guess=guess;
    let count=0;

    res.won= (guess===word)? true:false;
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

export function chooseSecret(){
    return wordlist[Math.floor( Math.random() * wordlist.length )];
}

