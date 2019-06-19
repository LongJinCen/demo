const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path')
const fs = require('fs')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const redisClient = require('./db/redis')
const app = express();

const env = process.env.NODE_ENV
if(env === 'dev') {
  app.use(logger('dev'));
} else {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log', 'access.log'), { flags: 'a' })
  app.use(logger('combined', {
    stream: accessLogStream
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  secret: 'fakjfjkahfsd',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient
  })
}))

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json('Not Found')
  next()
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;  
