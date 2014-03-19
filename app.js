/*!
 * MiniNote - app.js
 */

"use strict";

/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var fs = require('fs');
var sio = require('socket.io');
var config = require('./config');

var app = http.createServer(function handle(req, res) {
  if (req.url === '/') {
    return fs.readFile(path.join(__dirname, 'view/index.html'), 'utf-8',
    function (err, data) {
      if (err) {
        console.log(err.stack);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      return res.end(data);
    });
  }
});

var io = sio.listen(app);
var currentContent = '';
io.set('log level', 1);
io.sockets.on('connection', function (socket) {

  socket.emit('readStorage', { content: currentContent });

  socket.on('writeStorage', function (data) {
    data = data || {};
    currentContent = data.content || '';
    socket.broadcast.emit('readStorage', { content: currentContent });    
  });

});

module.exports = app;
