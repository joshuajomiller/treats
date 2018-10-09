let express = require('express');
let router = express.Router();
const Board = require("../models/Board");
const User = require("../models/User");

router.route('/')
/* GET user's boards */
  .get(function (req, res) {
		User.findOne({ email: req.tokenDetails.email})
			.then(user => {
				if (user.boards && user.boards.length){
					Board.find({ _id: { "$in" : user.boards} }, function (err, boards) {
						res.send(boards);
					})
				} else {
					res.send();
				}
			});
  })
  /* POST new board */
  .post(function (req, res) {
      let userId = req.tokenDetails.iat;
      let name = req.body.name;
      Board.create({name: name, userId: userId}, function (err, board) {
          if (err) {
              res.status(400).send(err)
          } else {
							User.findOne({ email: req.tokenDetails.email})
								.then(user => {
									user.boards.push(board._id);
									user.save(()=>{
										res.send(board);
									});
								})

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

router.route('/:id/post/:postId')
  .delete(function(req, res) {
    let boardId = req.params.id;
    let postId = req.params.postId;

		Board.findById(boardId, function(err, board) {
			if ( board ) {
				let post = board.posts.id(postId);
				if (post) {
					post.remove();
					board.save(function (err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.send({status: 'post deleted'});
						}
					});
				} else {
					res.status(400).send("post not found");
				}
			}
		});
  })
  .put(function(req, res) {
    let boardId = req.params.id;
    let postId = req.params.postId;
		let editedPost = req.body.post;

		Board.findById(boardId, function(err, board) {
			if ( board ) {
				let post = board.posts.id(postId);
				if (post) {
					post.$set({text: editedPost.text});
					board.save(function (err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.send({status: 'post updated'});
						}
					});
				} else {
					res.status(400).send("post not found");
				}
			}
		});
  });

module.exports = router;
