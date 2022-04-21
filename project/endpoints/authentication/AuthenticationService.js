var userService = require('../user/UserService');
var jwt = require("jsonwebtoken");
var config = require('config');
var logger = require('../../config/winston')

function createSessionToken(props, callback) {
  logger.debug("Authentication Service: create Token");
  if (!props) {

    logger.error("Error: no JSON body!")
    callback("JSON-Body missing", null, null);
    return;
  }
  userService.findUserById(props.userID, (err, user) => {

    if (user) {

      logger.debug('Found user, checking password!');

      user.comparePassword(props.password, (err, isMatch) => {

        if (err) {
          logger.error("Password is invalid!");
          callback(err, null);
        }
        else {

          if (isMatch) {
            logger.debug("Authentication Service: Password is correct. Create Token");

            var issuedAt = new Date().getTime();
            var expirationTime = config.get('session.timeout');
            var expiresAt = issuedAt + (expirationTime * 1000);
            var privateKey = config.get('session.tokenKey');
            let token = jwt.sign({ "user": user.userID }, privateKey, { expiresIn: expiresAt, algorithm: 'HS256' });

            console.log('Token created' + token);
            callback(null, token, user);
          }
          else {
            console.log("Password or userID is invalid " + isMatch);
            callback(err, null);
          }
        }
      })
    }
    else {
      console.log("Session Services: did not find user for userID: " + props.userID);
      callback("Did not find user", null);
    }
  })
}

module.exports = {
  createSessionToken,
}