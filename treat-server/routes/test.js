let express = require('express');
let router = express.Router();
const User = require("../models/User");
const Board = require("../models/Board");
const jwt   = require('jsonwebtoken');

router.post('/profile', function(req, res, next) {
  res.send(req.body.token);
});

router.post('/board', function(req, res, next) {
  let text = req.body.text;

  const board = {
    name: 'board' + Math.random(),
    owner: 'me',
    posts: [
      { post_type: 'TextPost', text: text },
      { post_type: 'TogglePost', textOn: 'stateOn', textOff: 'stateOff', state: true }
    ]
  };

  Board.create(board, function (err) {
    if (err) {
      res.status(400).send(err)
    } else {
      Board.find({}, function (err, posts) {
        res.send(posts);
      })


    }
  });
});

router.get('/token/check', function (req, res, next) {
  res.send(req.tokenDetails);
});

module.exports = router;
