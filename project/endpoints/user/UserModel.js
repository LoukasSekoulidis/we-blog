var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  //id: Number,
  userID: { type: String, unique: true },
  userName: String,
  //email: String,
  password: String,
  //image: String,
  isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }
);

UserSchema.methods.whoAmI = function () {
  var output = this.userID
    ? "My name is" + this.userName
    : "I don't have a name";
  console.log(output);
}

UserSchema.pre('save', (next) => {
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
    console.log(candidatePassword);
    console.log(this.password);
    console.log(isMatch);
    if (err)
      return next(err);
    else {
      next(null, isMatch);
    }
  });
}

const User = mongoose.model("User", UserSchema);
module.exports = User;