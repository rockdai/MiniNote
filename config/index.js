/*!
 * MiniNote - config/index.js
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var copy = require('copy-to');

var version = require('../package.json').version;

var root = path.dirname(__dirname);

var config = {
  version: version,
  port: 8484,
  enableCluster: false,
  debug: true,
  logdir: path.join(root, '.tmp', 'logs'),
  viewCache: false,

  oss: {
    accessKeyId: '',
    accessKeySecret: ''
  }
};

var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  copy(require(customConfig)).override(config);
}

mkdirp.sync(config.logdir);

module.exports = config;
