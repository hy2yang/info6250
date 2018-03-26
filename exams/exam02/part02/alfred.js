const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const service = require('./service');

app.listen(PORT, () => {
    console.log(`Alfred listening at ${PORT}`);
    console.log('use Ctrl-C to stop this server');
});