const jwt = require("jsonwebtoken");

function tokenDecode(req, res, next) {
  let token = req.get('Authorization');
  token = token.replace('Bearer ', '');
  if (token) {
    jwt.verify(token, 'your_jwt_secret_123', function(err, details) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.tokenDetails = details;
        next();
      }
    });
  } else {
    next();
  }
}

module.exports = tokenDecode;
