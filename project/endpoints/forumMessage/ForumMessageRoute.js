const express = require('express');
const router = express.Router();

const authenticationService = require('../authentication/AuthenticationService');
const ForumMessageModel = require('./ForumMessageModel');
const ForumMessageService = require('./ForumMessageService');

router.get('/', (req, res) => {
  ForumMessageService.getForumMessages((err, messages) => {
    if (messages) {
      const { forumThreadID, title, text, authorID } = req.query;
      if (forumThreadID) {
        messages = messages.filter(r => r.forumThreadID === forumThreadID);
      }
      if (title) {
        messages = messages.filter(r => r.title === title);
      }
      if (text) {
        messages = messages.filter(r => r.text === text);
      }
      if (authorID) {
        messages = messages.filter(r => r.authorID === authorID);
      }
      res.status(200).json(messages);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

router.post('/', (res, res) => {

})

module.exports = router;