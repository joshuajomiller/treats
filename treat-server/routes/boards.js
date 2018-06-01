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

module.exports = router;
