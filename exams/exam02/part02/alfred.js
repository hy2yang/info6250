const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const service = require('./service');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use( bodyParser.json({ extended: true, type: '*/*' }) );

app.post('/game',(req, res) => {
    const result = service.getSecretWord();
    res.send(JSON.stringify(result));
});

app.delete('/game/:ID',(req, res) => {
    service.deleteGame(req.params.ID);
    res.send('OK');
});

app.get('/game/:ID/guess/:GUESS',(req, res) => {
    const id = req.params.ID;
    const guess = req.params.GUESS;
    const feedback =service.processGuess(guess, id);
    if (feedback.error) res.status(400).send(JSON.stringify(feedback));
    else res.send(JSON.stringify(feedback));
});

app.put('/game/:ID/guessed',(req, res) => {
    const id = req.params.ID;
    const matched = req.body.matched;
    const feedback =service.makeNextGuess(id, matched);
    res.send(JSON.stringify(feedback));
});

app.listen(PORT, () => {
    console.log(`Alfred listening at ${PORT}`);
    console.log('use Ctrl-C to stop this server');
});