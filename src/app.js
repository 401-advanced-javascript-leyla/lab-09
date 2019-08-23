'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swagger = require('./api/swagger');

const apiRouter = require('../routes/api');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//jsdoc
app.use('/docs', express.static('./docs'));

// Routes
app.use(apiRouter);

// Catchalls
app.use('/*',notFound);
app.use(errorHandler);



// app.listen(3000, () => console.log(`Server up on port 3000`) );
module.exports = {
  server: app,
  start: port=>{
    const PORT = port || 3000;
    app.listen(PORT, ()=>{
      console.log(`Server is up at ${PORT}`);
    });
  },
};