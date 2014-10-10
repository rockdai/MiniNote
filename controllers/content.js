/*!
 * MiniNote - controllers/content.js
 */

'use strict';

/**
 * Module dependencies.
 */

var Content = require('../proxy/content');

exports.create = function (req, res, next) {
  var content = req.body.content;
  if (!content) {
    return res.status(400).end();
  }
  Content.create(content, function (err, resp, key) {
    if (err) {
      return next(err);
    }
    resp = resp || {};
    return res.status(resp.statusCode || 500).json({key: key});
  });
};
