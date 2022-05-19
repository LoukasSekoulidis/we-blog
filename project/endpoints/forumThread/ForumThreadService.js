const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
var jwt = require("jsonwebtoken");
const ForumThread = require('./ForumThreadModel');
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

function getForumThread(givenID, callback) {
  forumThreadModel.findById(givenID, function (err, thread) {
    if (err) {
      return callback('Unable to find a ForumThread with the Identifier: ' + givenID, null)
    }
    else if (!thread) {
      return callback(`False forumThreadID! No ForumThread with given uniqueIdentifier: ${givenID}, in database!`, null);
    }
    else {
      return callback(null, thread);
    }
  })
}

function getForumThreadsOfUser(token, callback) {
  if (typeof token !== "undefined") {
    tokenInfos = jwt.decode(token)
    forumThreadModel.find({ ownerID: tokenInfos.userID }, function (err, threads) {
      if (threads) {
        return callback(null, threads);
      } else {
        return callback('Could not find ForumThreads by User with UserID: ', tokenInfos.userID);
      }
    })
  }
  else {
    res.status(400).json({ error: "Not Authorized: No token received!" });
  }
}

function createForumThread(props, callback) {
  body = props.body;
  header = props.headers;

  if (typeof header.authorization !== "undefined") {
    let token = header.authorization.split(" ")[1];
    tokenInfos = jwt.decode(token);
  }
  else {
    return callback('No token received, need ownerID', null);
  }
  const forumThread = new ForumThread({
    name: body.name,
    description: body.description,
    ownerID: tokenInfos.userID
  })
  forumThread.save((err, thread) => {
    if (err && err.name === 'ValidationError') {
      return callback(err.message, null);
    }
    else if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, thread);
    }
  })
}

function updateForumThread(givenID, props, callback) {
  forumThreadModel.findById(givenID, function (err, forumThread) {
    if (err) {
      return callback(err)
    }
    else if (!forumThread) {
      return callback(`ForumThread with givenID: ${givenID}, does not exist!`);
    }
    else {
      Object.assign(forumThread, props);
      forumThread.save((err) => {
        if (err) {
          return callback(err, null);
        }
        else {
          return callback(null, forumThread);
        }
      });
    }
  });
}

function deleteForumThread(givenID, callback) {
  forumThreadModel.findByIdAndDelete(givenID, function (err, result) {
    if (err) {
      return callback(err);
    }
    else if (!result) {
      return callback('No Forum Thread in Database with givenID: ' + givenID);
    }
    else {
      return callback(null);
    }
  })
}

module.exports = {
  getForumThreads,
  getForumThread,
  getForumThreadsOfUser,
  createForumThread,
  updateForumThread,
  deleteForumThread
}