'use strict';

// require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};
mongoose.connect('mongodb+srv://leylali:loisli1155665@cluster0-o9fll.mongodb.net/test?retryWrites=true&w=majority', mongooseOptions);

require('./src/app.js').start(3000);
