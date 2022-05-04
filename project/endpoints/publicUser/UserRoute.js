const express = require('express');
const router = express.Router();

const userService = require('./UserService')


// get-operation of every User in database
router.get('/', (req, res, next) => {
  userService.getUsers((err, result) => {
    if (result) {
      res.status(200).json(result);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

// get-operation of a single User in database
router.get('/:userID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.getUser(urlID, (err, result) => {
    if (result) {
      res.status(200).json(result);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

// post-operation of a new User to database
router.post('/', (req, res, next) => {
  userService.createUser(req.body, (err, createdUser) => {
    if (err) {
      res.status(400).json({ Error: err });
    }
    else {
      res.status(201).json(createdUser);
    }
  })
})

// delete-operation of a single User in database
router.delete('/:userID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.deleteUser(urlID, (err) => {
    if (err) {
      res.status(400).json({ Error: err });
    }
    else {
      res.status(200).json({ Succes: `User with userID: ${urlID} deleted!` });
    }
  })
})

// update-operation of a single User in database
router.put('/:userID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.updateUser(urlID, req.body, (err, updatedUser) => {
    if (err) {
      res.status(400).json({ Error: err });
    }
    else {
      res.status(200).json(updatedUser);
    }
  })
})

module.exports = router;