var userService = require('../user/UserService');
var jwt = require("jsonwebtoken");
var config = require('config');
var logger = require('../../config/winston')

// Creates Token for the Basic - Authentication 
function createSessionTokenBasic(props, callback) {
  if (!props) {
    callback('Header Missing', null, null);
    return;
  }

  const base64Credentials = props.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':')

  userService.getUser(username, (err, user) => {
    if (user) {

      user.comparePassword(password, (err, isMatch) => {

        if (err) {
          callback(err, null);
        }
        else {

          if (isMatch) {
            var issuedAt = new Date().getTime();
            var expirationTime = config.get('session.timeout');
            var expiresAt = issuedAt + (expirationTime * 1000);
            var privateKey = config.get('session.tokenKey');
            var privateKey = config.get('session.tokenKey');
            // jwt => (header) payload, signature
            let token = jwt.sign(
              {
                "userID": user.userID,
                "userName": user.userName,
                "isAdministrator": user.isAdministrator
              }, privateKey, { expiresIn: expiresAt, algorithm: 'HS256' });

            callback(null, token, user);
          }
          else {
            callback('Authentication failed', null, null);
          }
        }
      })
    }
    else {

      callback("Did not find user", null);
    }
  })
}

// Checks if User is Authenticated by verifying, or denying a given Token
function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];
    var privateKey = config.get('session.tokenKey');

    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      if (err) {
        res.status(500).json({ error: "Not Authorized!" });
        return;
      }
      // Fallunterscheidung: Braucht Rechte, nein: ok, ja: -> hat rechte? : nein: f , ja: ok
      let hasRight = user.isAdministrator;
      if (!hasRight) {
        res.status(401).json({ error: "Not Authorized: not an admin!" });
        return;
      }
      return next();
    });
  } else {
    res.status(500).json({ error: "Not Authorized: No token received!" });
    return;
  }
}

module.exports = {
  createSessionTokenBasic,
  isAuthenticated
}