const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const service = require('./service.js');

//app.use( express.static('public') ); 
app.use( bodyParser.json({ extended: true, type: '*/*' }) );

app.get('/fullList',(req, res) => {
  res.send( JSON.stringify( service.fullList() ));
});

app.get('/api',(req, res) => {
  res.send( JSON.stringify( service.getSecretId() ));
});

app.post('/api',(req, res) => {
  const id = req.body.id;
  const guess = req.body.guess;
  const result = service.process(guess, id);
  if (result.error) {
    res.status(400).send( JSON.stringify(result) );
  }
  else res.send( JSON.stringify(result));
});

app.listen(PORT, () => {  
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
