var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

require('dotenv').config();
const cors = require('cors');

const mongoose = require('mongoose');
const morgan = require('morgan');
mongoose.connect('mongodb+srv://development:S7FOgGx5YFsUKJfB@cluster0.j9yts.mongodb.net/sistemasconvergentes-2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log('Connection OK');
}).catch((err) => {
  console.log(err);
})

var app = express();

app.use(cors())

app.use(morgan('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);

module.exports = app;
