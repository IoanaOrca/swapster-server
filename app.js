'use strict'
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items');

const app = express();

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));

//mongoose promise
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});
// session
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/items',itemsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({code: 'not-found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;
