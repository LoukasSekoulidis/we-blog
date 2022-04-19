const User = require('./UserModel');
const userModel = require('./UserModel');

function getUsers(callback) {
  userModel.find(function (err, users) {
    if (err) {
      console.log("Error with: " + err);
      return callback(err, null);
    }
    else {
      console.log("get Users OK");
      return callback(null, users);
    }
  })
}

function findUserById(searchUserID, callback) {
  console.log("UserService: find User by ID: " + searchUserID);
  if (!searchUserID) {
    callback("User Service: User Id is missing");
    return;
  }
  else {
    var query = User.findOne({ userID: searchUserID });
    query.exec((err, user) => {
      if (err) {
        console.log("User Service: Didn't find user for userID: " + searchUserID);
        return callback("User Service: Didn't find user for userID: " + searchUserID, null);
      }
      else {
        if (user) {
          console.log('Found userID' + searchUserID);
          callback(null, user);
        }
        else {
          if ("admin" === searchUserID) {
            console.log('User Service: Do not have admin account yet. Creating default admin account!');
            var adminUser = new User();
            adminUser.userID = "admin";
            adminUser.password = "123";
            adminUser.userName = "Default Administrator Account";
            adminUser.isAdministator = true;

            adminUser.save((err) => {
              if (err) {
                console.log("User Service: Couldn't create default admin account: " + err);
                callback("Could not login to admin account", null);
              }
              else {
                callback(null, adminUser);
              }
            });
          }
          else {
            console.log("User Service: Couldn't find user for userID: " + searchUserID);
            callback(null, user);
          }
        }
      }
    });
  }
}

module.exports = {
  getUsers,
  findUserById
};