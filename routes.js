/*!
 * MiniNote - routes.js
 */

'use strict';

/**
 * Module dependencies.
 */
var pages = require('./controllers/pages');

module.exports = function (router) {

  router.get('/', pages.home);

  return router;
};
