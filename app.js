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
var qnfs = require('qnfs');
var config = require('./config');

qnfs.config(config.qiniu);

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
var currentContent = null;
io.set('log level', 1);
io.sockets.on('connection', function (socket) {

  if (currentContent) {
    socket.emit('readStorage', { content: currentContent });
  } else {
    qnfs.readFile(config.storage, 'utf-8', function (err, content) {
      if (err) {
        console.log(err.stack);
        return socket.emit('error', err);
      }
      currentContent = content;
      socket.emit('readStorage', { content: content });
    });
  }

  socket.on('writeStorage', function (data) {
    data = data || {};
    var content = data.content || '';
    qnfs.writeFile(config.storage, content, 'utf-8', function (err) {
      if (err) {
        console.log(err.stack);
        return socket.emit('error', err);
      }
      currentContent = content;
    });
    socket.broadcast.emit('readStorage', { content: content });
  });

});

module.exports = app;