let express = require('express');
let router = express.Router();
const Board = require("../models/Board");

router.route('/')
/* GET user's boards */
  .get(function (req, res) {
    Board.find({}, function (err, boards) {
      res.send(boards);
    })
  })
  /* POST new board */
  .post(function (req, res) {
      let userId = req.tokenDetails.iat;
      let name = req.body.name;
      Board.create({name: name, userId: userId}, function (err, small) {
          if (err) {
              res.status(400).send(err)
          } else {
              res.send({status: 'board created'});
          }
      });
  });

router.route('/:id')
/* GET  board */
  .get(function(req, res) {
      let id = req.params.id;
      Board.findById(id, function (err, board) {
          res.send(board);
      })
  })
  /* PUT change board */
  .put(function (req, res) {

  })

  /* DELETE board */
  .delete(function (req, res) {

  });

router.route('/:id/post')
  .post(function(req, res) {
    let boardId = req.params.id;
    let post = req.body.post;
		Board.findByIdAndUpdate(boardId, { $push: { posts: post }}, function (err, updatedBoard) {
			if (err){
				res.status(400).send(err);
			} else {
				res.send({status: 'post created'});
			}
		});
  });

module.exports = router;
