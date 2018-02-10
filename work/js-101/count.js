let guesses=["TREES", "TEASE", "START", "STRAP", "LEVEL", "PARTS"];
const word="PARTS";

for (let i of guesses){
    console.log(word+" "+i+" "+samePos(word, i)+" "+match(word,i));    
}

function samePos(word, guess){
    let res = 0;
    
    for (let i=0;i<word.length;++i){
        if (word[i] === guess[i]) ++res;
    }
    return res;
}

function match(word, guess){
    let res = 0;
    const map={};

    for (let i in word){
        if (word[i] === guess[i]) ++res;
        else{
            if (!map[word[i]]) map[word[i]] = 0;        
            if (!map[guess[i]]) map[guess[i]] = 0;

            if (map[word[i]] < 0 ) ++res;
            if (map[guess[i]] > 0) ++res;
            ++map[word[i]];
            --map[guess[i]];
        }
    }
    return res;
}