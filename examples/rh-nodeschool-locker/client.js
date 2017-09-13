const yargs = require('yargs');
const request = require('request-promise');
const fs = require('fs');
const Configstore = require('configstore');

const conf = new Configstore('courselocker', {});

let jsonRequest = request.defaults({
  json: true
});

const argv = yargs.usage('$0 <cmd> [args]')
  .command('target <url>', 'create new locker', {})
  .command('create', 'create new locker', {})
  .command('delete <id>', 'delete new locker', {})
  .command('list <id>', 'list files in locker', {})
  .command('upload <id> <file>', 'upload file to locker', {})
  .command('download <id> <file>', 'download file from locker', {})
  .help().argv;

async function commands (arg) {
  const command = argv._[0];
  try {
    if (command === 'target') {
      conf.set('url', argv.url);
      console.log(`Targetting ${argv.url}`);
    } else if (command === 'create') {
      const locker = await jsonRequest.post(`${conf.get('url')}/`);
      console.log(locker.id);
    } else if (command === 'delete') {
      await jsonRequest.delete(`${conf.get('url')}/${argv.id}`);
    } else if (command === 'list') {
      const listResponse = await jsonRequest.get(`${conf.get('url')}/${argv.id}/items`);
      for (let file of listResponse) {
        console.log(file);
      }
    } else if (command === 'upload') {
      const file = fs.createReadStream(argv.file);
      const upload = jsonRequest.post(`${conf.get('url')}/${argv.id}/item/${argv.file}`);

      file.pipe(upload);

      const response = await upload;
      console.log(response);
    } else if (command === 'download') {
      const file = fs.createWriteStream(argv.file);
      const download = jsonRequest.get(`${conf.get('url')}/${argv.id}/item/${argv.file}`);

      download.pipe(file);
      
      await download;
      console.log('Downloaded');
    }
  } catch (e) {
    console.log(e)
  }
}

commands(argv);

