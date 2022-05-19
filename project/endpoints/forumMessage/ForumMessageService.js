const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
var jwt = require("jsonwebtoken");

const ForumMessageModel = require('./ForumMessageModel');
const ForumMessageService = require('./ForumMessageService');
const ForumThreadModel = require('../forumThread/ForumThreadModel');

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

function getForumMessagesOfThread(forumThreadID, callback) {
  ForumMessageModel.find({ forumThreadID: forumThreadID }, (err, messages) => {
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

  ForumThreadModel.findById(body.forumThreadID, function (err, forumThread) {
    if (err) {
      return callback('Can not find forumThread: ' + body.forumThreadID, null);
    }
    const forumMessage = new ForumMessageModel({
      forumThreadID: body.forumThreadID,
      title: body.title,
      text: body.text,
      authorID: tokenInfos.userID
    })
    forumMessage.save((err, thread) => {
      if (err) {
        return callback('Mistake saving new ForumMessage: ' + err.message, null);
      }
      else {
        return callback(null, thread);
      }
    })
  })
};

function deleteForumMessage(forumMessageID, callback) {
  ForumMessageModel.findByIdAndDelete(forumMessageID, function (err, result) {
    if (err) {
      return callback(err)
    }
    else if (!result) {
      return callback('No ForumMessage in Database with id: ' + forumMessageID);
    }
    else {
      return callback(null);
    }
  })
};

module.exports = {
  getForumMessages,
  createForumMessages,
  getForumMessagesOfThread,
  deleteForumMessage
};