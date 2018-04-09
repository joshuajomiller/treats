let express = require('express');
let router = express.Router();
const User = require("../models/User");

/* GET users listing. */


router.route('/')
  .get(function (req, res) {
    res.send('Get all Users')
  })
  .post(function (req, res) {
    User.create({ email: req.body.email, password: req.body.password }, function (err, small) {
      if (err){
        res.status(400).send(err)
      }
      res.send('Saved!');
    });

  });

/* GET user profile. */
router.get('/profile', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
