'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var modelsPath = path.resolve(__dirname, '../server/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});
var expect = require('expect.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Article = mongoose.model('Article');

/**
 * Globals
 */
var user;
var article;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {this.timeout(15000);
  describe('Model Article:', function() {
    beforeEach(function(done) {
      user = new User({
        username: 'user',
        email: 'test@test.com',
        password: 'password'
      });

      user.save(function() {
        article = new Article({
          title: 'Article Title',
          content: 'Article Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return article.save(function(err) {
          expect(err).to.be(null);
          expect(article.title).to.equal('Article Title');
          expect(article.content).to.equal('Article Content');
          expect(article.user.length).to.not.equal(0);
          expect(article.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        article.title = '';

        return article.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        article.content = '';

        return article.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        article.user = {};

        return article.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      article.remove(function () {
        user.remove(done);
      });
    });
  });
});
