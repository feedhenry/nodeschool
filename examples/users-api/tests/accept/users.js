var logger = require('winston');
var buildServer = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../../seed/seed');
var expect = require('chai').expect;
var PouchDB = require('pouchdb');
var fs = require('fs');
var request = require('request-promise');

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';

const baseRequest = request.defaults({
  baseUrl: url,
  json: true
});

function wrapError (promise) {
  return promise
    .then(result => [null,result])
    .catch(err => [err]);
}

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
    it('should return a list of users', async function () {
      var response = await baseRequest('/users');
      expect(response.rows).be.a('array');
      expect(response.rows.length).to.be.eql(100);
    });
  });

  describe('/GET users/:id', function () {
    it('should fail if user doesn\'t exist', async function () {
      let err, response;
      [err, response] = await wrapError(baseRequest('/users/tinywolf000'));
      expect(err.statusCode).to.be.equal(404);
    });

    it('should return a single user', async function () {
      var response = await baseRequest('/users/tinywolf709');
      expect(response.name.first).to.equal('alison');
    });
  });

  describe('/POST users/:id', function () {
    it('should create single user', async function () {
      // Find a user in the DB
      await baseRequest.post({
        uri: '/users/crazybear294',
        body: {
          'gender': 'female',
          'email': 'alison.reid@example.com',
          'username': 'tinymouse700'
        }
      });
      var response = await baseRequest('/users/tinywolf709');
      expect(response.email).to.equal('alison.reid@example.com');
    });

    it('should fail if user already exists', async function () {
      let err, response;
      [err, response] = await wrapError(baseRequest.post('/users/tinywolf709'));
      expect(response).to.be.equal(undefined);
      expect(err).to.be.a('object');
      expect(err.statusCode).to.be.equal(500);
    });
  });

  describe('/PUT users/:id', function () {
    it('should update a single user', async function () {
      await baseRequest.put({
        uri: '/users/tinywolf709',
        body: {
          'username': 'tinymouse700'
        }
      });
      var changed = await baseRequest.get('/users/tinywolf709');
      expect(changed.username).to.equal('tinymouse700');
      expect(changed.gender).to.equal('female');
    });
  });

  describe('/DELETE users/:id', function () {
    it('should delete a single user', async function () {
      await baseRequest.delete('/users/crazybear294');
      let err, response;
      [err, response] = await wrapError(baseRequest('/users/crazybear294'));
      expect(err.statusCode).to.be.equal(404);
    });
  });

  describe('PUT users/:id/attachment/:name', function () {
    it('should add an attachment', function (done) {
      // Find a user in the DB
      fs.readFile('./Rebio-park-menu-27.pdf', (err, upload) => {
        chai.request(url)
        .put('/users/tinywolf709/attachment/test.pdf')
        .set('content-type', 'application/octet-stream')
        .send(upload)
        .end(function (err, res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });
  });
});
