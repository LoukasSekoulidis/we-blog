const express = require('express');
const router = express.Router();

const userService = require('./UserService')

router.get('/', (req, res, next) => {
  userService.getUsers((err, result) => {
    console.log("Result" + result);
    if (result) {
      res.send(Object.values(result));
    }
    else {
      res.send("Error retrieving users!");
    }
  });
});

module.exports = router;