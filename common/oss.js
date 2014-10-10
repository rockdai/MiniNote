/**!
 * MiniNote - common/oss.js
 */

'use strict';

/**
 * Module dependencies.
 */
var OSS = require('oss-client');
var config = require('../config');

module.exports = new OSS.OssClient(config.oss);
