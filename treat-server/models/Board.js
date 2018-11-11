const mongoose = require('mongoose');

const postOptions = {
    discriminatorKey: 'post_type',
    timestamps: true
};

const postSchema = new mongoose.Schema({
    title: String,
    tags: Array
}, postOptions);

const boardSchema = new mongoose.Schema({
    name: String,
    ownerId: String,
    posts: [postSchema],
    sharedUsers: Array
}, {timestamps: true});

boardSchema.path('posts').discriminator('TextPost', new mongoose.Schema({
    text: String
}));

boardSchema.path('posts').discriminator('TogglePost', new mongoose.Schema({
    textOn: String,
    textOff: String,
    state: Boolean
}));

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
