var mongoose = require('mongoose');
const { MongoGridFSChunkError } = require('mongodb');

const ForumThreadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ownerID: { type: String, required: true }
}, { timestamps: true }
);

const ForumThread = mongoose.model("ForumThread", ForumThreadSchema);
module.exports = ForumThread;