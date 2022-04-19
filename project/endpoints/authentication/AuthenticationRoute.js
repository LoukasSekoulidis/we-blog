const express = require('express');
const router = express.Router();

var authenticationService = require('./AuthenticationService')

router.post('/login', (req, res, next) => {
  console.log('Authentication Route: Want to create Token')
  authenticationService.createSessionToken(req.body, (err, token, user) => {
    if (token) {
      res.header("Authorization", "Bearer" + token);

      if (user) {
        const { id, userID, userName, ...partialObject } = user;
        const subset = { id, userID, userName };
        console.log(JSON.stringify(subset));
        res.send(subset);
      }
      else {
        console.log("Authentication Route: User is null, even though a token has been created! Error: " + err);
        res.send("Could create token");
      }
    }
    else {
      console.log("Authentication Route: Token has not been created, Error: " + err);
      res.send("Could not create token");
    }
  });
});

module.exports = router;