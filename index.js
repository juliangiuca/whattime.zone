'use strict';
var express = require('express');
var app     = express();
var log     = require('./logging');
var http    = require('http');

var url = process.env.TARGET_URL;
if (url) {
  setInterval(function() { http.get(url + '/ping'); }, 60000);
}

app.set('view engine', 'jade');
app.use(require('express-bunyan-logger')());
app.use(require('express-bunyan-logger').errorLogger());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { });
});

app.get('/ping', function (req, res) {
  res.send('pong');
});



app.listen(process.env.PORT || 3000, function () {
  log.info('server up - log');
});
