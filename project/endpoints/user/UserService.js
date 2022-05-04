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
      return callback('Duplicate Key Error: User with given userID already exists! Duplicate userID is not allowed.', null);
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

// deletes User (singular) in databse
function deleteUser(givenID, callback) {
  userModel.findOneAndDelete({ userID: givenID }, function (err, doc) {
    if (err) {
      return callback(err);
    }
    else if (!doc) {
      return callback('No user in database with given userID: ' + givenID);
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

// creates default Admin on launch of Server, in case there is no user with userID: 'admin' 
function createDefaultAdmin() {
  userModel.findOne({ userID: 'admin' }, function (err, res) {
    if (res) {
      console.log('Default Admin already exists!')
    } else {
      console.log('User Service: Do not have admin account yet. Creating default admin account!');
      var adminUser = new User();
      adminUser.userID = "admin";
      adminUser.password = "123";
      adminUser.userName = "Default Administrator Account";
      adminUser.isAdministrator = true;

      adminUser.save((err) => {
        if (err) {
          console.log("Could not create admin account");
        }
        else {
          console.log("Created admin account");
        }
      });
    }
  })
}

module.exports = {
  updateUser,
  deleteUser,
  createUser,
  getUser,
  getUsers,
  createDefaultAdmin
};