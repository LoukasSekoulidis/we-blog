const express = require('express');
const router = express.Router();

const userService = require('./UserService')
const authenticationService = require('../authentication/AuthenticationService')


//get - operation of every User in database
router.get('/', authenticationService.isAuthenticated, (req, res, next) => {
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
router.get('/:userID', authenticationService.isAuthenticated, (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.getUser(urlID, (err, result) => {
    if (result) {
      res.status(200).json({ userID: result.userID, userName: result.userName, isAdministrator: result.isAdministrator });
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

// post-operation of a new User to database
router.post('/', authenticationService.isAuthenticated, (req, res, next) => {
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
router.delete('/:userID', authenticationService.isAuthenticated, (req, res, next) => {
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
router.put('/:userID', authenticationService.isAuthenticated, (req, res, next) => {
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