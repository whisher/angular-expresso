'use strict';

var assert = require("assert");
var request = require('supertest');
var app = require("../server");

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(){
		      assert.equal(-1, [1,2,3].indexOf(5));
		      assert.equal(-1, [1,2,3].indexOf(0));
		});
  	});
});
describe('User Api', function () {
	var user = {email:'io@il.it',password:'ppppp'};
	it('should return 200 on /', function (done) {
		request(app)
      			.get('/')
      			.expect(300)
      			.end(function(err, res){console.log(err);
        if (err) return done(err);
        done()
      });
      	});
	it('sign up should return 400 on /', function (done) {
		request(app)
      			.post('/api/auth/signup')
      			.send({})
      			.expect(400)
      			.expect("marcus is stored", done);
      	});
	
})