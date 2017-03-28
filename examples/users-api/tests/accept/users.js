var logger = require('winston');
var buildServer = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../../seed/seed');
var expect = require('chai').expect;
var PouchDB = require('pouchdb');

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';


describe('Users', function() {

  // Before our test suite
  before(function(done) {
    // Start our app on an alternative port for acceptance tests
    seed('./test-db-userapi',function(err) {
    var server = buildServer({database: "./test-db-userapi"})
    server.listen(8001, function() {
      logger.info('Listening at http://localhost:8001 for acceptance tests');
      // Seed the DB with our users
       done(err);
      });
    });
  });

  describe('/GET users', function() {
    it('should return a list of users', function(done) {
      chai.request(url)
        .get('/users')
        .end(function(err, res) {
          res.body.rows.should.be.a('array');
          res.should.have.status(200);
          res.body.rows.length.should.be.eql(100);
          done();
        });
    });
  });

  describe('/GET users/:id', function() {
    it('should return a single user', function(done) {
      // Find a user in the DB
      var db = new PouchDB("./test-db-userapi");
      db.allDocs({limit:1},function(err, users) {
        var id = users.rows[0].id;

        // Read this user by id
        chai.request(url)
          .get('/users/' + id)
          .end(function(err, res) {
            res.should.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.name.first).to.be.a('string');
            done();
          });
      });
    });
  });
});
