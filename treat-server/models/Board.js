const mongoose = require('mongoose');
const Post = require('Post');

const boardSchema = new mongoose.Schema({
  name: String,
  owner: String,
  posts: [Post.Post]
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
