var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var logger = require('winston');
var bodyParser = require('body-parser');
var userController = require('./controllers/users');
var PouchDB = require('pouchdb');

function buildApp (config) {
  var app = express();
  // Add middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use('/users', userController(new PouchDB(config.database)));
  return app;
}

// Some switches for acceptance tests
if (require.main === module) {
  // Only connect to MongoDB if app.js is run
  // If require'd (e.g. in tests), let these tests establish a DB connection themselves
  const config = require('./config.json');
  const app = buildApp(config);
  // See the User Controller for `/users` routes
  // Only listen when app.js is run - acceptance tests will listen on another port
  app.listen(8000, function () {
    logger.info('Listening at http://localhost:8000 - see here for API docs');
  });
}

module.exports = buildApp;
