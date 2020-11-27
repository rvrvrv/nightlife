const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const routes = require('./app/routes/index.js');

const app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/controllers', express.static(`${process.cwd()}/app/controllers`));
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/common', express.static(`${process.cwd()}/app/common`));

routes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Node.js listening on port ${port}...`));
