var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

const userShema = new mongoose.Schema({
  //id: Number,
  userID: { type: String, unique: true },
  userName: String,
  //email: String,
  password: String,
  //image: String,
  isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }
);