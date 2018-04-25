let express = require('express');
let router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.post('/profile', function(req, res, next) {
  res.send(req.body.token);
});

router.post('/post', function(req, res, next) {
  let text = req.body.text;
  Post.TextPost.create({text: text}, function (err) {
    if (err) {
      res.status(400).send(err)
    } else {
      Post.Post.find({}, function (err, posts) {
        res.send(posts);
      })


    }
  });
});

module.exports = router;
