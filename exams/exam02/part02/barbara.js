const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8888;
const service = require('./service');

app.listen(PORT, () => {
    console.log(`Barbara listening at ${PORT}`);
    console.log('use Ctrl-C to stop this server');
});