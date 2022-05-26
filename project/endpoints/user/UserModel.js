var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

// mongoose Schema describing a User
const UserSchema = new mongoose.Schema({
  //id: Number,
  userID: { type: String, required: true, unique: true },
  userName: String,
  userMail: String,
  password: String,
  //image: String,
  isAdministrator: { type: Boolean, default: false },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmationCode: {

  }
}, { timestamps: true }
);

// prints the name of a .this User
UserSchema.methods.whoAmI = function () {
  var output = this.userID
    ? "My name is" + this.userName
    : "I don't have a name";
  console.log(output);
}

// before saving, check if password has been modified, if so, hash the new password and update password
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) { return next() };
  bcryptjs.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  })
}, function (err) {
  next(err)
})

UserSchema.methods.comparePassword = function (candidatePassword, next) {
  bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err)
      return next(err);
    else {
      next(null, isMatch);
    }
  });
}

const User = mongoose.model("User", UserSchema);
module.exports = User;