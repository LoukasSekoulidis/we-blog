var mongoose = require('mongoose');
const { MongoGridFSChunkError } = require('mongodb');

const ForumMessageSchema = new mongoose.Schema({
  forumThreadID: { type: String, required: true },
  title: String,
  text: String,
  authorID: { type: String, required: true }
}, { timestamps: true }
);

const ForumMessage = mongoose.model("ForumMessage", ForumMessageSchema);
module.exports = ForumMessage;