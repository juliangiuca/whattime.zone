'use strict';
var express = require('express');
var app     = express();
var log     = require('./logging');

app.set('view engine', 'jade');
app.use(require('express-bunyan-logger')());
app.use(require('express-bunyan-logger').errorLogger());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { });
});


app.listen(3000, function () {
  log.info('server up - log');
});
