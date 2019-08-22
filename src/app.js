'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

// Models
// TODO: Pull these in (or create them)!
const Products = require('../models/products/products');
const products = new Products();

const Categories = require('../models/categories/categories');
const categories = new Categories();

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
// app.get('/', test);
app.get('/api/v1/categories', getCategories);
app.post('/api/v1/categories', postCategories);
app.get('/api/v1/categories/:id', getCategory);
app.put('/api/v1/categories/:id', putCategories);
app.delete('/api/v1/categories/:id', deleteCategories);

app.get('/api/v1/products', getProducts);
app.post('/api/v1/products', postProducts);
app.get('/api/v1/products/:id', getProduct);
app.put('/api/v1/products/:id', putProducts);
app.delete('/api/v1/products/:id', deleteProducts);

// Catchalls
app.use('/*',notFound);
app.use(errorHandler);

// ROUTE HANDLER FUNCTIONS

//test function

// function test(req, res,next){
//   res.send('hi there');
// }

function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  return categories.get()
    .then( data => {
      console.log('here');
      const output = {
        count: data.count,
        results: data.results,
      };
      console.log('got categories', output);
      response.status(200).json(output);
    })
    .catch(err=>console.log(err) );
}

function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  return categories.get(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}

function postCategories(request,response,next) {
  // expects the record that was just added to the database
  return categories.create(request.body)
    .then( result => { 
      // console.log('this is in postcategory',result);
      return response.status(201).json(result[0]);
    })
    .catch( err=>console.log(err) );
}


function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  return categories.update(request.params.id, request.body)
    .then( result => response.status(200).json(result[0]) )
    .catch( err=>console.log(err) );
}

function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  return categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}


function getProducts(request,response,next) {
  // expects an array of objects back
  return products.get()
    .then( data => {
      const output = {
        count: data.count,
        results: data.results,
      };
      // console.log('this is in getProducts', output);
      response.status(200).json(output);
    })
    .catch( err=>console.log(err) );
}

function getProduct(request,response,next) {
  // expects an array with one object in it
  return products.get(request.params.id)
    .then( result => {
      console.log('this is in getProduct w id', result[0]);
      return response.status(200).json(result[0]); 
    })
    .catch( err=>console.log(err) );
}

function postProducts(request,response,next) {
  // expects the record that was just added to the database
  return products.create(request.body)
    .then( result => {
      // console.log('this is in postProducts',result);
      return response.status(201).json(result); 
    })
    .catch( err=>console.log(err) );
}


function putProducts(request,response,next) {
  // expects the record that was just updated in the database
  return products.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}

function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  return products.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}


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