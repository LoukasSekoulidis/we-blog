const userModel = require('./UserModel');

function getUsers(callback) {
  userModel.find(function (err, users) {
    if (err) {
      console.log("Fehler bei Suche" + err);
      return callback(err, null);
    }
    else {
      console.log("Alles OK");
      return callback(null, users);
    }
  })
}

module.exports = {
  getUsers
};