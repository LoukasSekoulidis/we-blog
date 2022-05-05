var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
const { MongoGridFSChunkError } = require('mongodb');
const User = require('../user/UserModel');

const ForumThreadSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  userID: { type: String, required: true }
}, { timestamps: true }
);

const ForumThread = mongoose.model("Forumthread", ForumThreadSchema);
module.exports = ForumThread;