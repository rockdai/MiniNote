/**!
 * MiniNote - test/controllers/pages.test.js
 */

'use strict';

/**
 * Module dependencies.
 */

var mm = require('mm');
var request = require('supertest');
var app = require('../../app');
var Content = require('../../proxy/content');

// dc7c12e5b72012bbc7e47c3e5436903c
var testContent = 'unit test';

describe('controllers/pages.test.js', function () {
  afterEach(function () {
    mm.restore();
  });
  describe('GET /', function () {
    it('should 200', function (done) {
      request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        res.text.should.containEql('</html>');
        done(err);
      });
    });
  });
  describe('GET /:key', function () {
    var testKey = null;
    before(function (done) {
      Content.create(testContent, function (err, resp, key) {
        resp.statusCode.should.equal(200);
        testKey = key;
        done(err);
      });
    });
    it('should 500 when Content.get error', function (done) {
      mm.error(Content, 'get', 'Mock Content.get error.');
      request(app)
      .get('/' + testKey)
      .expect(500, done);
    });
    it('should 200 when succeed', function (done) {
      request(app)
      .get('/' + testKey)
      .expect(200)
      .end(function (err, res) {
        var c = '<div id="editor">' + testContent + '</div>';
        res.text.should.containEql(c);
        done(err);
      });
    });
  });
});
