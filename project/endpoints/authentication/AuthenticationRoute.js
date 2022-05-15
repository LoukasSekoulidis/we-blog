const express = require('express');
const router = express.Router();

var authenticationService = require('./AuthenticationService')

router.get('/', (req, res, next) => {
  console.log('Authentication Route: Want to create Token');

  if (typeof req.headers.authorization != "undefined") {

    authenticationService.createSessionTokenBasic(req.headers, (err, token, user) => {
      if (token) {
        res.header("Authorization", "Bearer " + token);

        if (user) {
          res.status(200).json({ Success: 'Token created successfully' });
        }
        else {
          res.status(400).json({ Error: 'Something went wrong:' + err });
        }
      }
      else {
        res.status(401).json({ Error: 'Failed to create Token: ' + err });
      }
    });
  }
  else {
    res.status(400).json({ Error: 'Authorization is undefined in Header!' })
  }
})


module.exports = router;