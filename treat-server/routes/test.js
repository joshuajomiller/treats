let express = require('express');
let router = express.Router();
const User = require("../models/User");

/* GET user profile. */
router.post('/profile', function(req, res, next) {
  res.send(req.params.token);
});

module.exports = router;
