/**!
 * MiniNote - test/controllers/content.test.js
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

describe('controllers/content.test.js', function () {
  afterEach(function () {
    mm.restore();
  });
  describe('POST /content', function () {
    it('should 400 when invalid params', function (done) {
      request(app)
      .post('/content')
      .send({ foo: 'bar' })
      .expect(400, done);
    });
    it('should 500 when Content.create error', function (done) {
      mm.error(Content, 'create', 'Mock Content.create error.');
      request(app)
      .post('/content')
      .send({ content: testContent })
      .expect(500, done);
    });
    it('should 200 when succeed', function (done) {
      request(app)
      .post('/content')
      .send({ content: testContent })
      .expect(200)
      .end(function (err, res) {
        res.body.key.should.equal('dc7c12e5b72012bbc7e47c3e5436903c');
        done(err);
      });
    });
  });
});
