
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;  

const listCode = require('./listCode');

app.use( express.static('public') ); 
app.use( bodyParser.json({ extended: true, type: '*/*' }) );


app.listen(PORT, () => {  
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('use Ctrl-C to stop this server');
});
