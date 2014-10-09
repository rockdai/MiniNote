/*!
 * MiniNote - controllers/pages.js
 */

'use strict';

/**
 * Module dependencies.
 */



exports.home = function (req, res, next) {
  return res.render('index', {
    current: new Date()
  });
};
