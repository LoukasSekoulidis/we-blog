const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
const forumThreadModel = require('./ForumThreadModel');

function getForumThreads(callback) {
  forumThreadModel.find(function (err, threads) {
    if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, threads);
    }
  })
}

function createForumThread(props, callback) {
  if (!props) {
    callback('Header Missing', null, null);
    return;
  }

  const base64Credentials = props.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':')

  // find User? Create ForumThread, post to Database...
}