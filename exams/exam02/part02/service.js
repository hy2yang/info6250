const wordlist = require('./wordlist');

let gameCount = 0;
const games = {};


function getSecretWord() {
    let i = gameCount++;
    const secret = random(wordlist);
    newGameRecord(i, secret);
    return {secret : secret, id:i};
}

function newGameRecord(index, secret){
    games[index] = {
        secret : secret,
        candidates : wordlist,
        myGuess : [],
        matched : []
    };
}

function processGuess(guess, gameId) {
    guess = guess.toUpperCase();
    gameId = String(gameId);
    const res = {};
    res.seenId = gameId;
    res.seenGuess = guess;
    checkId(gameId, res);
    checkGuess(guess, res);
    if (res.error) return res;
    return count(guess, games[gameId].secret, res);
}

function makeNextGuess(gameId, matched) {
    games[gameId].matched.push(+matched);
    const lastGuess = games[gameId].myGuess[games[gameId].myGuess.length - 1];
    gameId = String(gameId);
    if (matched && lastGuess) adapt(gameId, matched, lastGuess);
    const res = {};
    res.guess = makeGuess(gameId, lastGuess);
    games[gameId].myGuess.push(res.guess);
    return res;
}

function deleteGame(gameId) {
    gameId = String(gameId);
    delete games[gameId];
}


function checkId(gameId, res) {
    if (Object.keys(games).indexOf(gameId) < 0) {
        res.error = 'id not valid! ';
    }
    return res;
}

function checkGuess(guess, res) {
    if (!guess || !guess.match(/[A-Z]{5}/)) {
        res.error += guess + ' is not a valid guess!';
    }
    return res;
}


function count(guess, word, res) {
    res.hasWon = (guess === word) ? true : false;
    if (res.hasWon) {
        res.matched = 5;
    }
    else res.matched = common(word, guess);
    return res;
}

function common(word, guess) {
    let res = 0;
    const map = {};
    for (let i in word) {
        if (word[i] === guess[i])++res;
        else {
            if (!map[word[i]]) map[word[i]] = 0;
            if (!map[guess[i]]) map[guess[i]] = 0;

            if (map[word[i]] < 0)++res;
            if (map[guess[i]] > 0)++res;
            ++map[word[i]];
            --map[guess[i]];
        }
    }
    return res;
}

function makeGuess(gameId, lastGuess) {
    if (games[gameId].candidates && games[gameId].candidates.length===1){
        return games[gameId].candidates[0];
    } 
    let temp;
    let min = 5;
    if (lastGuess) {                        // choose one with least common letters of last guess
        for (let i of games[gameId].candidates) {
            temp = common(i, lastGuess);
            if (temp < min) {
                guess = i;
                min = temp;
            }
        }
    }
    else guess = random(games[gameId].candidates);

    return guess;
}

function adapt(gameId, match, lastGuess) {
    if (!match) return;
    match=+match;
    games[gameId].matched.push(match);
    games[gameId].candidates = games[gameId].candidates.filter(
        word => (word !== lastGuess && common(word, lastGuess) === match)
    );

}

function random(list) {
    return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
    getSecretWord: getSecretWord,
    processGuess: processGuess,
    makeNextGuess: makeNextGuess,
    deleteGame : deleteGame
}