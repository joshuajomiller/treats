let express = require('express');
let router = express.Router();
const User = require("../models/User");
const jwt  = require('jsonwebtoken');

router.route('/')

/* GET users listing. */
  .get(function (req, res) {
    res.send('Get all Users')
  })

  /* POST new user. */
  .post(function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({email: email}, (err, existingUser) => {
      if (err) {
        res.status(400).send({error: err});
      } else {
        if (existingUser) {
          res.status(400).send({msg: 'There is already an existing user registered with that email.'});
        } else {
          User.create({email: email, password: password}, function (err, small) {
            if (err) {
              res.status(400).send(err)
            }
            const token = jwt.sign({email: email, password: password}, 'your_jwt_secret_123');
            console.log(token);
            res.send({token});
          });
        }
      }
    });
  });

/* GET user profile. */
router.get('/profile', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
