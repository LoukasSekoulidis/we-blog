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

function getUser(givenID, callback) {
  userModel.findOne({ userID: givenID }, function (err, user) {
    if (err) {
      console.log("Error with: " + err);
      return callback(err, null);
    }
    else {
      console.log(`get User: ${givenID} OK`);
      return callback(null, user);
    }
  })
}

function createUser(props, callback) {
  const pers = new User({
    userID: props.userID,
    userName: props.userName,
    password: props.password,
    isAdministrator: props.isAdministrator
  });
  pers.save((err, user) => {
    if (err) {
      console.log('Error Saving new Person: ' + err);
      return callback(err);
    }
    else {
      return callback(null);
    }
  });
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

function deleteUser(givenID, callback) {
  userModel.findOneAndDelete({ userID: givenID }, function (err) {
    if (err) {
      console.log('Error with: ' + err);
      return callback(err);
    }
    else {
      console.log('Delete User Ok!')
      return callback(null);
    }
  })
}

function updateUser(givenID, props, callback) {
  userModel.findOne({ userID: givenID }, function (err, user) {
    if (err) {
      return callback(err)
    }
    else if (user == undefined) {
      return callback();
    }
    else {
      Object.assign(user, props);
      user.save((err) => {
        if (err) {
          console.log('Error Updating Person: ' + err);
          return callback(err);
        }
        else {
          return callback(null);
        }
      })
    }
  });
}

module.exports = {
  updateUser,
  deleteUser,
  createUser,
  getUser,
  getUsers,
  findUserById
};