const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
const User = require('./UserModel');
const userModel = require('./UserModel');


// gets every User(multiple) in database
function getUsers(callback) {
  userModel.find(function (err, users) {
    if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, users);
    }
  })
}

// gets a User (singular) in databse
function getUser(givenID, callback) {
  userModel.findOne({ userID: givenID }, function (err, user) {
    if (err) {
      return callback(err, null);
    }
    else if (!user) {
      return callback(`False userID! No User with given userID: ${givenID}, in database!`)
    }
    else {
      return callback(null, user);
    }
  })
}

// creates a single User and saves it to database
function createUser(props, callback) {
  const pers = new User({
    userID: props.userID,
    userName: props.userName,
    password: props.password,
    isAdministrator: props.isAdministrator
  });
  pers.save((err, user) => {
    if (err && err.code === 11000) {
      return callback('Duplicate Key Error: Given userID already taken! Duplicate userID is not allowed.', null);
    }
    else if (err && err.name === 'ValidationError') {
      return callback('Validation Error: No UserID. userID is required!', null);
    }
    else if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, user);
    }
  });
}

function findUserById(searchUserID, callback) {
  if (!searchUserID) {
    callback("User Service: User Id is missing");
    return;
  }
  else {
    var query = User.findOne({ userID: searchUserID });
    query.exec((err, user) => {
      if (err) {
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

// deletes User (singular) in databse
function deleteUser(givenID, callback) {
  userModel.findOneAndDelete({ userID: givenID }, function (err, doc) {
    if (err) {
      return callback(err);
    }
    else if (!doc) {
      return callback('No document in database with given userID: ' + givenID);
    }
    else {
      return callback(null);
    }
  })
}

// updates User (singular) in databse
function updateUser(givenID, props, callback) {
  userModel.findOne({ userID: givenID }, function (err, user) {
    if (err) {
      return callback(err)
    }
    else if (!user) {
      return callback(`User with given userID: ${givenID}, does not exist!`);
    }
    else {
      Object.assign(user, props);
      user.save((err) => {
        if (err) {
          return callback(err, null);
        }
        else {
          return callback(null, user);
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