var express = require('express');
var router = express.Router();

function getReqBuffer (req) {
  return new Promise((resolve, reject) => {
    const bufs = [];
    req.on('data', d => bufs.push(d));
    req.on('end', () => resolve(Buffer.concat(bufs)));
    req.on('err', e => reject(e));
  });
}

async function userExists (db, id) {
  try {
    await db.get(id);
    return true;
  } catch (err) {
    if (err.status === 404) {
      return false;
    } else {
      throw err;
    }
  }
}

function wrapPouchException (next) {
  return async function (req, res) {
    try {
      await next(req, res);
    } catch (err) {
      if (err.status) {
        res.status(err.status).json(err);
      } else {
        res.status(500).json({
          error: 'Error listing users: ' + err
        });
      }
    }
  };
}

function userController (db) {
  router.get('/', async function (req, res) {
    const users = await db.allDocs();
    res.json(users);
  });

  router.get('/:id', wrapPouchException(async function (req, res) {
    const user = await db.get(req.params.id);
    res.json(user);
  }));

  router.post('/:id', wrapPouchException(async function (req, res) {
    const data = req.body;
    const id = req.params.id;
    if (await userExists(db, id)) {
      throw Error('User already exists: ' + id);
    } else {
      data._id = id;
      const result = await db.put(data);
      res.json(result);
    }
  }));

  router.put('/:id', wrapPouchException(async function (req, res) {
    var id = req.params.id;
    var data = req.body;
    const doc = await db.get(id);
    const response = await db.put(Object.assign(doc, data));
    res.json(response);
  }));

  router.delete('/:id', wrapPouchException(async function (req, res) {
    var id = req.params.id;
    const doc = await db.get(id);
    const response = await db.remove(id, doc._rev);
    res.json(response);
  }));

  router.put('/:id/attachment/:name', wrapPouchException(async function (req, res) {
    var id = req.params.id;
    var name = req.params.name;
    const buffer = await getReqBuffer(req);
    const doc = await db.get(id);
    if (!('_attachments' in doc)) {
      doc['_attachments'] = {};
    }
    doc['_attachments'][name] = {
      'content_type': 'application/octet-stream',
      'data': buffer
    };
    const response = await db.put(doc);
    res.json(response);
  }));

  router.get('/:id/attachment/:name', wrapPouchException(async function (req, res) {
    var id = req.params.id;
    var name = req.params.name;
    const response = await db.getAttachment(id, name);
    res.type('application/octet-stream');
    res.end(response, 'binary');
  }));

  router.delete('/:id/attachment/:name', wrapPouchException(async function (req, res) {
    var id = req.params.id;
    var name = req.params.name;
    const doc = await db.get(id);
    const response = await db.removeAttachment(id, name, doc._rev);
    res.json(response);
  }));

  return router;
}

module.exports = userController;
