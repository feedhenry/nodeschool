/**
 * DB Seeder - seeds MongoDB with documents from `users.json` on disk
 *
 * To seed, run `npm run-script seed`
 */

var logger = require('winston');
var PouchDB = require('pouchdb')

var seed = function(dbname,cb) {
    var user_data = require('./users.json');
    var old_db = new PouchDB(dbname);
    var new_db;
    old_db.destroy()
    .then(() => {
      new_db = new PouchDB(dbname);
      return new_db.bulkDocs(user_data[0].documents);
    }).then(function (result) {
      logger.log(result);
      new_db.close(cb)
    }).catch(function (err) {
      logger.log(err);
      new_db.close(cb)
    });
}

// Run explicitly (e.g. not require'd)
if (require.main === module) {
  if(process.argv.length != 3){
    logger.log('You need to specify database.');
  } else {
    seed(process.argv[2], function() {
      logger.log('Seeding complete, exiting.');
    });
  }
}

module.exports = seed;