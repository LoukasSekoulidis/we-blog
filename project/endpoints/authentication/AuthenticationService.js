var userService = require('../user/UserService');
var jwt = require("jsonwebtoken");
var config = require('config');

function createSessionToken(props, callback) {
  console.log("Authentication Service: create Token");
  if (!props) {
    console.log("Error: no JSON body!")
    callback("JSON-Body missing", null, null);
    return;
  }
  userService.findUserById(props.userID, (err, user) => {

    if (user) {
      console.log('Authentication Service: Found user, checking password!');

      user.comparePassword(props.password, (err, isMatch) => {
        // an welcher stelle checken ob passwort true or false??
        if (err) {
          console.log("Authentication Service: Password is invalid!");
          callback(err, null);
        }
        else {
          console.log("Authentication Service: Password is correct. Create Token");

          var issuedAt = new Date().getTime();
          var expirationTime = config.get('session.timeout');
          var expiresAt = issuedAt + (expirationTime * 1000);
          var privateKey = config.get('session.tokenKey');
          let token = jwt.sign({ "user": user.userID }, privateKey, { expiresIn: expiresAt, algorithm: 'HS256' });

          console.log('Token created' + token);
          callback(null, token, user);
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