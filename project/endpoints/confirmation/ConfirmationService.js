const config = require('config');
var jwt = require("jsonwebtoken");

const userModel = require('../user/UserModel')

const User = require('../user/UserModel');

function verifyUser(confirmationCode, callback){
  User.findOne({confirmationCode: confirmationCode}, (err, user) => {
    if(user){
      user.confirmed = true
      user.save((err) =>{
        if(err){
          callback('Could not save user after confirming eMail');
        }
        else{
          callback(null, user)
        }
      })
    }
    else{
      callback('Could not find user with confirmationCode!');
    }
  })
}

function isVerified(req, res, next){
  console.log('Check if verified')
  if (typeof req.headers.authorization !== "undefined") {
    token = req.headers.authorization.split(" ")[1]
    tokenInfos = jwt.decode(token);

    userModel.findOne({userID: tokenInfos.userID}, (err, user) => {
      if(err){
        res.status(404).json({Error: 'Could not find user: ' + tokenInfos.userID})
        return;
      }
      else {
        if(user.confirmed == true) {
          return next();
        } 
        else {
          res.status(400).json({Error: 'User is not verified'});
        }
      }
    })    
  } else {
    res.status(400).json({Error: '"Validation failed: No token received!"'})
  }
}

module.exports = {
  verifyUser,
  isVerified,
}