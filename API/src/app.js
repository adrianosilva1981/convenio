'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Conecta ao banco
mongoose.Promise = Promise;
mongoose.connect(config.connectionString, { useMongoClient: true });

// Carrega os Modulos
require('./models/user');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');

app.use(bodyParser.json({
  limit: '5mb',
}));
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Habilita o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/users', userRoute);

module.exports = app;
