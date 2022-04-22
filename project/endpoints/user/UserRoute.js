const express = require('express');
const router = express.Router();

const userService = require('./UserService')

router.get('/', (req, res, next) => {
  userService.getUsers((err, result) => {
    if (result) {
      res.status(200).send(Object.values(result));
    }
    else {
      res.status(404).send("Error retrieving users!");
    }
  });
});

router.get('/:userID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.getUser(urlID, (err, result) => {
    if (result) {
      //res.status(200).json(Object.values(result));
      res.status(200).send(result);
    }
    else {
      res.status(404).send(`Error retrieving user ${urlID}: ` + err);
    }
  });
});

router.post('/', (req, res, next) => {
  userService.createUser(req.body, (err) => {
    if (err) {
      res.status(404).send('Error saving User: ' + err);
    }
    else {
      res.status(200).send('User saved!');
    }
  })
})

router.delete('/:userID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.deleteUser(urlID, (err) => {
    if (err) {
      res.status(404).send('Error deleting User: ' + err);
    }
    else {
      res.status(200).send('User deleted!');
    }
  })
})

router.put('/:userID', (req, res, next) => {
  let urlID = req.url.split('/')[1];
  userService.updateUser(urlID, req.body, (err) => {
    if (err) {
      res.status(404).send('Error updating User: ' + err);
    }
    else {
      res.status(200).send('User updated!');
    }
  })
})


module.exports = router;