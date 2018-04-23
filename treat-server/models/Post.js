const mongoose = require('mongoose');

const options = {
  discriminatorKey: 'post_type',
  timestamps: true
};

const postSchema = new mongoose.Schema({
  title: String,
  tags: Array
}, options);

const textPostSchema = new mongoose.Schema({
  text: String
}, options);

const togglePostSchema = new mongoose.Schema({
  textOn: String,
  textOff: String,
  state: Boolean
}, options);


const Post = mongoose.model('Post', postSchema);
const TextPost = mongoose.model('TextPost', textPostSchema);
const TogglePost = mongoose.model('TogglePost', togglePostSchema);

module.exports = {Post, TextPost, TogglePost};
