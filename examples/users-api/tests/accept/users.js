var logger = require('winston');
var buildServer = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../../seed/seed');
var expect = require('chai').expect;
var PouchDB = require('pouchdb');
var fs = require('fs');

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';

describe('Users', function () {
  // Before our test suite
  before(function (done) {
    // Start our app on an alternative port for acceptance tests
    seed('./test-db-userapi', function (err) {
      var server = buildServer({database: './test-db-userapi'});
      server.listen(8001, function () {
        logger.info('Listening at http://localhost:8001 for acceptance tests');
      // Seed the DB with our users
        done(err);
      });
    });
  });

  describe('/GET users', function () {
    it('should return a list of users', function (done) {
      chai.request(url)
        .get('/users')
        .end(function (err, res) {
          res.body.rows.should.be.a('array');
          res.should.have.status(200);
          res.body.rows.length.should.be.eql(100);
          done();
        });
    });
  });

  describe('/GET users/:id', function () {
    it('should fail if user doesn\'t exist', function (done) {
      chai.request(url)
        .get('/users/tinywolf000')
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
    });

    it('should return a single user', function (done) {
      // Find a user in the DB
      var db = new PouchDB('./test-db-userapi');
            // Read this user by id
      chai.request(url)
        .get('/users/tinywolf709')
        .end(function (err, res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.name.first).to.be.a('string');
          expect(res.body.name.first).to.equal('alison');
          done();
        });
    });
  });

  describe('/POST users/:id', function () {
    it('should create single user', function (done) {
      // Find a user in the DB
      var db = new PouchDB('./test-db-userapi');
            // Read this user by id
      chai.request(url)
        .post('/users/tinymouse700')
        .send({
          'gender': 'female',
          'email': 'alison.reid@example.com',
          'username': 'tinymouse700'
        })
        .end(function (err, res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });

    it('should fail if user already exists', function (done) {
      // Find a user in the DB
      var db = new PouchDB('./test-db-userapi');
            // Read this user by id
      chai.request(url)
        .post('/users/tinywolf709')
        .send({
          'gender': 'female',
          'email': 'alison.reid@example.com',
          'username': 'tinymouse700'
        })
        .end(function (err, res) {
          res.should.have.status(500);
          done();
        });
    });
  });
/*
 "body-parser": "^1.17.1",
    "cors": "^2.7.1",
    "express": "^4.14.0",
    "morgan": "^1.7.0",
    "pouchdb": "^6.1.2",
    "winston": "^2.2.0"
*/
  describe('/PUT users/:id', function () {
    it('should update a single user', function (done) {
      // Find a user in the DB
      var db = new PouchDB('./test-db-userapi');
            // Read this user by id
      chai.request(url)
        .put('/users/tinywolf709')
        .send({
          'gender': 'female',
          'email': 'alison.reid@example.com',
          'username': 'tinymouse700'
        })
        .end(function (err, res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('/DELETE users/:id', function () {
    it('should delete a single user', function (done) {
      // Find a user in the DB
      var db = new PouchDB('./test-db-userapi');
            // Read this user by id
      chai.request(url)
        .delete('/users/crazybear293')
        .end(function (err, res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
/*
  describe('PUT users/:id/attachment/:name', function () {
    it('should add an attachment', function (done) {
      // Find a user in the DB
      fs.readFile('./Rebio-park-menu-27.pdf', (err, upload) => {
        chai.request(url)
        .put('/users/tinywolf709/attachment/test.zip')
        .set('content-type', 'application/octet-stream')
        .send(upload)
        .end(function (err, res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });
  });*/
});
