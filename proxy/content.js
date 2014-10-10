/**!
 * MiniNote - proxy/content.js
 */

'use strict';

/**
 * Module dependencies.
 */
var utils = require('utility');
var oss = require('../common/oss');

var bucket = 'mininote';

exports.create = function (content, callback) {
  var key = utils.md5(content);
  oss.putObject({
    bucket: bucket,
    object: key,
    srcFile: new Buffer(content, 'utf8'),
    contentType: 'text/plain'
  }, function (err, resp) {
    if (err) {
      return callback(err);
    }
    return callback(null, resp, key);
  });
};

exports.get = function (key, dest, callback) {
  oss.getObject({
    bucket: bucket,
    object: key,
    dstFile: dest
  }, callback);
};
