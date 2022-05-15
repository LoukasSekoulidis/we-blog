const express = require('express');
const router = express.Router();

const ForumThread = require('./ForumThreadModel');
const forumThreadService = require('./ForumThreadService');
const authenticationService = require('../authentication/AuthenticationService');


//gets all ForumThreads in Database
router.get('/', (req, res, next) => {
  forumThreadService.getForumThreads((err, result) => {
    if (result) {
      const { name, description, ownerID } = req.query;
      if (name) {
        result = result.filter(r => r.name === name)
      }
      if (description) {
        result = result.filter(r => r.description === description)
      }
      if (ownerID) {
        console.log('in get');
        result = result.filter(r => r.ownerID === ownerID)
      }
      res.status(200).json(result);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

router.get('/myForumThreads', (req, res, next) => {
  forumThreadService.getForumThreadsOfUser(req.headers.authorization.split(" ")[1], (err, forumThreads) => {
    if (forumThreads) {
      res.status(200).json(forumThreads);
    } else {
      res.status(404).json({ Error: err });
    }
  })
})

//get a specific ForumThread
router.get('/:forumThreadID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  forumThreadService.getForumThread(urlID, (err, forumThread) => {
    if (forumThread) {
      res.status(200).json(forumThread);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});


// Posts a new ForumThread to Database
router.post('/', authenticationService.isAuthenticated, (req, res, next) => {
  forumThreadService.createForumThread(req, (err, result) => {
    if (err) {
      res.status(400).json({ Error: err });
    }
    else {
      res.status(201).json(result);
    }
  })
});

// updated a ForumThread
router.put('/:forumThreadID', authenticationService.isAuthenticated, (req, res, next) => {
  let urlID = req.url.split('/')[1];
  forumThreadService.updateForumThread(urlID, req.body, (err, updatedForumThread) => {
    if (err) {
      res.status(400).json({ Error: err });
    }
    else {
      res.status(200).json(updatedForumThread)
    }
  })
});

router.delete('/:forumThreadID', authenticationService.isAuthenticated, (req, res, next) => {
  let urlID = req.url.split('/')[1];
  forumThreadService.deleteForumThread(urlID, (err) => {
    if (err) {
      res.status(400).json({ Error: err });
    }
    else {
      res.status(204).send();
    }
  });
});

module.exports = router;