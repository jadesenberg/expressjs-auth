const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//db setup
mongoose.connect('mongodb://localhost/auth',{ useMongoClient: true });

app.use(morgan('combined')); // for log in of user info
app.use(cors()); // for cors
app.use(bodyParser.json({ type: '*/*' })); //json parser
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('Start on port,', port);