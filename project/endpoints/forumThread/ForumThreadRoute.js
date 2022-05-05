const express = require('express');
const router = express.Router();

const forumThreadService = require('./ForumThreadService');

//gets all ForumThreads in Database
router.get('/', (req, res, next) => {
  forumThreadService.getForumThreads((err, result) => {

  });
});

// Posts a new ForumThrread to Database
routert.post('/', (req, res, next) => {
  forumThreadService.createForumThread(req.headers, (err, result) => {
    //TBD
  })
});
