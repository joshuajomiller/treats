// const mongoose = require('mongoose');
//
// const options = {
//   discriminatorKey: 'post_type',
//   timestamps: true
// };
//
// const postSchema = new mongoose.Schema({
//   title: String,
//   tags: Array
// }, options);
//
// const Post = mongoose.model('Post', postSchema);

// const TextPost = Post.discriminator('TextPost', new mongoose.Schema({
//   text: String
// }));
//
// const TogglePost = Post.discriminator('TogglePost', new mongoose.Schema({
//   textOn: String,
//   textOff: String,
//   state: Boolean
// }));

// module.exports = {Post, TextPost, TogglePost};
// module.exports = {Post};

// carry on here: http://thecodebarbarian.com/mongoose-4.8-embedded-discriminators
