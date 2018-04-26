let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tokenDecode = require('./middleware/tokenDecode');

let index = require('./routes/index');
let users = require('./routes/users');
let test = require('./routes/test');
let auth = require('./routes/auth');
let boards = require('./routes/boards');
require('./controllers/passport');

dotenv.load({ path: '.dev.env' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  }
);

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(tokenDecode);

app.use('/', index);
app.use('/user', users);
app.use('/auth', auth);
app.use('/board', passport.authenticate('jwt', {session: false}), boards);
app.use('/test', passport.authenticate('jwt', {session: false}), test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
