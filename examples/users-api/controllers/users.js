var express = require('express');
var router = express.Router();

function userController(db){
    // GET /users
    // Get a list of users
    router.get('/', function(req, res) {
      db.allDocs(function(err, users) {
        if (err) {
          return res.status(500).json({
            error: "Error listing users: " + err
          });
        }

        res.json(users);
      });
    });

    // GET /users/:id
    // Get a user by ID
    router.get('/:id', function(req, res) {
      db.get(req.params.id
      , function(err, user) {
        if (err) {
          return res.status(500).json({
            error: "Error reading user: " + err
          });
        }

        if (!user) {
          return res.status(404).end();
        }

        res.json(user);
      });
    });

    return router
}

module.exports = userController;
