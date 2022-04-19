var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  //id: Number,
  userID: { type: String, unique: true },
  userName: String,
  //email: String,
  password: String,
  //image: String,
  isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }
);

userSchema.methods.whoAmI = function () {
  var output = this.userID
    ? "My name is" + this.userName
    : "I don't have a name";
  console.log(output);
}

const User = mongoose.model("User", userSchema);
module.exports = User;