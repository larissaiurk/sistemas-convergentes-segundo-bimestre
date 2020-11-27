var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');

const cors = require('cors');

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://development:S7FOgGx5YFsUKJfB@cluster0.j9yts.mongodb.net/sistemasconvergentes-3?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log('Connection OK');
}).catch((err) => {
  console.log(err);
})


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/category', categoryRouter);

module.exports = app;
