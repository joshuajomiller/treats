let express = require('express');
let router = express.Router();
const Board = require("../models/Board");
const User = require("../models/User");

router.route('/')
/* GET user's boards */
    .get(function (req, res) {
        let allBoards = [];
        User.findOne({email: req.tokenDetails.email})
            .then(user => {
                let ownedBoardPromise;
                if (user.boards && user.boards.length) {
                    ownedBoardPromise = Board.find({_id: {"$in": user.boards}}).lean().exec();
                }
                let sharedBoardPromise = Board.find({ 'sharedUsers': user._id }).lean().exec();

                Promise.all([ownedBoardPromise, sharedBoardPromise]).then(function(boards) {
                    let ownedBoards = boards[0];
                    if (ownedBoards && ownedBoards.length){
                        ownedBoards.forEach(board => {
                            board.status = 'owned';
                        });
                        allBoards = allBoards.concat(ownedBoards);
                    }
                    let sharedBoards = boards[1];
                    if (sharedBoards && sharedBoards.length){
                        sharedBoards.forEach(board => {
                            board.status = 'shared';
                        });
                        allBoards = allBoards.concat(sharedBoards);
                    }
                    res.send(allBoards);
                });
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
                User.findOne({email: req.tokenDetails.email})
                    .then(user => {
                        user.boards.push(board._id);
                        user.save(() => {
                            res.send(board);
                        });
                    })
            }
        });
    });

router.route('/:id')
/* GET  board */
    .get(function (req, res) {
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
    .post(function (req, res) {
        let boardId = req.params.id;
        let post = req.body.post;
        Board.findByIdAndUpdate(boardId, {$push: {posts: post}}, function (err, updatedBoard) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send({status: 'post created'});
            }
        });
    });

router.route('/:id/post/:postId')
    .delete(function (req, res) {
        let boardId = req.params.id;
        let postId = req.params.postId;

        Board.findById(boardId, function (err, board) {
            if (board) {
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
    .put(function (req, res) {
        let boardId = req.params.id;
        let postId = req.params.postId;
        let editedPost = req.body.post;

        Board.findById(boardId, function (err, board) {
            if (board) {
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

router.route('/:id/share/')
    .get(function (req, res) {
        let boardId = req.params.id;
        Board.findById(boardId, function (err, board) {
            if (board) {
                if (board.sharedUsers.length){
                    let sharedWith = [];
                    board.sharedUsers.forEach((sharedUser, index) => {
                        User.findById(sharedUser, function (err, user) {
                            if (user) {
                                sharedWith.push(user.email);
                            }
                            if (index + 1 === board.sharedUsers.length){
                                res.send(sharedWith);
                            }
                        });
                    });
                } else {
                    res.send();
                }
            } else {
                res.status(400).send({error: 'board does not exists'});
            }
        });
    })
    .post(function (req, res) {
        let boardId = req.params.id;
        let email = req.body.email;

        User.findOne({email: email})
            .then(user => {
                if (user) {
                    let userId = user._id;
                    Board.findById(boardId, function (err, board) {
                        if (board) {
                            let sharedWith = board.sharedUsers.filter(user => {
                                console.log('checking: ' + user + ' against ' + userId);
                                return user.equals(userId);
                            });
                            if (!sharedWith.length) {
                                board.sharedUsers.push(userId);
                                board.save(function (err) {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        res.send({status: 'success', email: email});
                                    }
                                });
                            } else {
                                res.status(400).send({error: 'user already exists'});
                            }
                        } else {
													res.status(400).send({error: 'board does not exist'});
												}
                    });
                } else {
                    res.status(400).send({status: 'user not found'});
                }
            });
    });
router.route('/:id/share/:email')
    .delete(function (req, res) {
        let boardId = req.params.id;
        let email = req.params.email;

        User.findOne({email: email})
            .then(user => {
                if (user) {
                    let userId = user._id;
                    Board.findById(boardId, function (err, board) {
                        if (board) {
													board.sharedUsers = board.sharedUsers.filter(user => {
														return !user.equals(userId);
													});
													board.save(function (err) {
														if (err) {
															res.status(400).send(err);
														} else {
															res.send({status: 'success', email: email});
														}
													});
                        } else {
													res.status(400).send({error: 'board does not exist'});
												}
                    });
                } else {
                    res.status(400).send({status: 'user not found'});
                }
            });
    });

module.exports = router;
