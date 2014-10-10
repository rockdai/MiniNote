/**!
 * MiniNote - test/proxy/content.test.js
 */

'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var mm = require('mm');
var Content = require('../../proxy/content');
var oss = require('../../common/oss');

var testKey = 'dc7c12e5b72012bbc7e47c3e5436903c';
var testdir = path.dirname(__dirname);
var tmpFilePath = path.join(testdir, 'oss-test-file');

describe('proxy/content.test.js', function () {

  var ws = null;

  before(function () {
    ws = fs.createWriteStream(tmpFilePath);
  });
  afterEach(function () {
    mm.restore();
  });
  after(function (done) {
    fs.unlink(tmpFilePath, done);
  });

  describe('create()', function () {
    it('should get error when OSS client putObject failed', function (done) {
      mm.error(oss, 'putObject', 'Mock putObject error.');
      Content.create('unit test', function (err, resp, key) {
        err.should.be.an.Error;
        err.message.should.equal('Mock putObject error.');
        done();
      });
    });
    it('should create content ok', function (done) {
      Content.create('unit test', function (err, resp, key) {
        resp.statusCode.should.equal(200);
        key.should.equal(testKey);
        done(err);
      });
    });
  });

  describe('get()', function () {
    it('should get error when OSS client getObject failed', function (done) {
      mm.error(oss, 'getObject', 'Mock getObject error.');
      Content.get(testKey, ws, function (err, resp) {
        err.should.be.an.Error;
        err.message.should.equal('Mock getObject error.');
        done();
      });
    });
    it('should get content ok', function (done) {
      Content.get(testKey, ws, function (err, resp) {
        resp.statusCode.should.equal(200);
        fs.readFileSync(tmpFilePath, 'utf8').should.equal('unit test');
        done(err);
      });
    });
  });

});
