const crypto = require('crypto');
const fs = require('fs');
const test = require('blue-tape');
var tapSpec = require('tap-spec');
const request = require('request-promise');

test.createStream().pipe(tapSpec())
  .pipe(process.stdout);

const url = 'http://localhost:8000/locker';

const baseRequest = request.defaults({
  baseUrl: url
});

const baseJsonRequest = baseRequest.defaults({
  json: true
});

function hashFromStream (stream) {
  const hash = crypto.createHash('sha256');
  return new Promise((resolve, reject) => {
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('err', (err) => reject(err));
  });
}

test('End to end test', async (t) => {
  try {
    const locker = await baseJsonRequest.post(`/`);

    const emptyListResponse = await baseJsonRequest.get(`/${locker.id}/items`);
    t.deepEqual(emptyListResponse, [], 'should find no files yet');

    const localFileHash = await hashFromStream(fs.createReadStream('./test.pdf'));
    await fs.createReadStream('./test.pdf')
      .pipe(baseRequest.post(`/${locker.id}/item/test.pdf`));
    const listResponse = await baseJsonRequest.get(`/${locker.id}/items`);
    t.deepEqual(listResponse, ['test.pdf'], 'should see the uploaded file');

    const downloadedFileHash = await hashFromStream(baseRequest.get(`/${locker.id}/item/test.pdf`));
    t.equal(downloadedFileHash, localFileHash,
      'Uploaded and downloaded files should be same');

    baseJsonRequest.delete(`/${locker.id}`);
  } catch (exc) {
    t.fail('shouldn\'t have an exception', exc);
  }
});
