const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined')); // for log in of user info
app.use(bodyParser.json({ type: '*/*' })); //json parser

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Start on port,', port);