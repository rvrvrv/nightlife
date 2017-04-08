'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

routes(app);

const port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
