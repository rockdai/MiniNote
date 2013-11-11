/*!
 * MiniNote - dispatch.js
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('./config');
var app = require('./app');

app.listen(config.port);

console.log('[%s] [master:%d] Server started, listen at %d',
  new Date(), process.pid, config.port);