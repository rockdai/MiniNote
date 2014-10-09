/*!
 * MiniNote - app.js
 */

'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var ms = require('ms');
var ejs = require('ejs');
var partials = require('express-partials');

var routes = require('./routes');
var config = require('./config');

var rootdir = __dirname;

var app = express();

app.set('x-powered-by', false);

app.use(methodOverride());
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.version = config.version;
ejs.open = '{%';
ejs.close = '%}';
app.engine('.html', ejs.__express);
app.set('views', path.join(rootdir, 'views'));
app.set('view engine', 'html');

partials.register('.html', ejs.render);
app.use(partials());

app.use('/assets', serveStatic(path.join(rootdir, 'assets')));

/**
 * Routes
 */
app.use(routes(router));

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  err.url = err.url || req.url;
  console.log(err.stack);
  res.status(500).end();
});

/**
 * Page not found handler
 */
app.use(function (req, res, next) {
  res.status(404).end();
});

module.exports = http.createServer(app);
