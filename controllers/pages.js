/*!
 * MiniNote - controllers/pages.js
 */

'use strict';

/**
 * Module dependencies.
 */
var stream = require('stream');
var Content = require('../proxy/content');

exports.home = function (req, res, next) {
  var key = req.params.key;
  if (!key) {
    return res.render('index', {
      key: '',
      content: ''
    });
  }
  var dest = new stream.Writable();
  var list = [];
  var len = 0;
  dest._write = function (chunk, encoding, callback) {
    list.push(chunk);
    len += chunk.length;
    callback();
  };
  Content.get(key, dest, function (err, resp) {
    if (err) {
      return next(err);
    }
    resp = resp || {};
    var str = Buffer.concat(list, len).toString();
    return res.status(resp.statusCode || 500).render('index', {
      key: key,
      content: resp.statusCode === 200 ? str : ''
    });
  });
};
