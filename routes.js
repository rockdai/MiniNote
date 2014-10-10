/*!
 * MiniNote - routes.js
 */

'use strict';

/**
 * Module dependencies.
 */
var pages = require('./controllers/pages');
var content = require('./controllers/content');

module.exports = function (router) {

  router.get('/:key?', pages.home);
  router.post('/content', content.create);

  return router;
};
