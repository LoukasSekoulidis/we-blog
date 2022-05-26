var userService = require('../user/UserService');
var userModel = require('../user/UserModel');
var jwt = require("jsonwebtoken");
var config = require('config');
var logger = require('../../config/winston')

// Creates Session Token for Basic authentication
function createSessionTokenBasic(props, callback) {
  if (!props) {
    callback('Header Missing', null, null);
    return;
  }
  const base64Credentials = props.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':')

  userModel.findOne({ userID: username }, function (err, user) {
  if (user.confirmed == false){
    callback('User has not confirmed e-Mail', null, null)
  }
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
        res.status(401).json({ Error: "Not Authorized!" });
        return;
      }
      return next();
    });
  } else {
    res.status(401).json({ Error: "Authorization failed: No token received!" });
    return;
  }
}

// Checks if User is an Administrator
function isAdministrator(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];
    tokenInfos = jwt.decode(token);
    userModel.findOne({ userID: tokenInfos.userID }, function (err, user) {
      if (user) {
        if (user.isAdministrator === true) {
          return next();
        }
        else {
          res.status(403).json({ Error: "Not an administrator!" });
          return;
        }
      }
      else {
        res.status(400).json({ Error: "Could not find a user with id: " + userID })
        return;
      }
    })
  } else {
    res.status(401).json({ Error: "Authorization failed: No token received!" });
    return;
  }
}

module.exports = {
  createSessionTokenBasic,
  isAuthenticated,
  isAdministrator,
}