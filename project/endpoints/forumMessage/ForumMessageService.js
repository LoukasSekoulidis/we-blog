const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
var jwt = require("jsonwebtoken");

const ForumMessageModel = require('./ForumMessageModel');
const ForumMessageService = require('./ForumMessageService');

function getForumMessages(callback) {
  ForumMessageModel.find(function (err, messages) {
    if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, messages);
    }
  })
}

function createForumMessages(body, header, callback) {
  if (typeof header.authorization !== "undefined") {
    let token = header.authorization.split(" ")[1];
    tokenInfos = jwt.decode(token);
  }
  else {
    return callback('No token received!', null);
  }

  const forumMessage = new ForumMessageModel({
    forumThreadID: body.forumThreadID,
    title: body.title,
    text: body.text,
    authorID: tokenInfos.userID
  })
  ForumMessageModel.save((err, thread) => {
    if (err) {
      return callback('Mistake saving new ForumMessage: ' + err.message, null);
    }
    else {
      return callback(null, thread);
    }
  })
};

module.exports = {
  getForumMessages,
  createForumMessages
};