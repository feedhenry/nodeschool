const express = require('express');
const PouchDB = require('pouchdb');

const db = new PouchDB('/tmp/database');

const app = express();
const router = express.Router();
var path = require('path');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/locker', router);
app.listen(8000, function () {
  console.log('Listening at http://localhost:8000');
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


function wrap (responder) {
  return async (req, res) => {
    try {
      await responder(req, res);
    } catch (exception) {
      console.log(exception)
      res.status(500).json(exception);
    }
  };
}

router.post('/', wrap(async (req, res) => {
  const dbResponse = await db.post({'_attachments': {}});
  res.status(200).json(dbResponse);
}));

router.get('/:id/items', wrap(async (req, res) => {
  const id = req.params.id;
  const dbResponse = await db.get(id);
  const attachments = Object.keys(dbResponse._attachments);
  res.status(200).json(attachments);
}));

router.delete('/:id', wrap(async (req, res) => {
  var id = req.params.id;
  const doc = await db.get(id);
  const dbResponse = await db.remove(id, doc._rev);
  res.json(dbResponse);
}));

function getReqBuffer (req) {
  return new Promise((resolve, reject) => {
    const bufs = [];
    req.on('data', d => bufs.push(d));
    req.on('end', () => resolve(Buffer.concat(bufs)));
    req.on('err', e => reject(e));
  });
}

router.post('/:id/item/:name', wrap(async (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  const buffer = await getReqBuffer(req);
  const doc = await db.get(id);
  doc['_attachments'][name] = {
    'content_type': 'application/octet-stream',
    'data': buffer
  };
  const response = await db.put(doc);
  res.json(response);
}));

router.get('/:id/item/:name', wrap(async (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  const response = await db.getAttachment(id, name);
  res.type('application/octet-stream');
  res.end(response, 'binary');
}));
