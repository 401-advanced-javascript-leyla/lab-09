'ues strict';

const express = require('express');

const router = express.Router();
const Products = require('../models/products/products');

const products = new Products();


//routes for categories with callbacks

router.get('/', getProducts);
router.post('/', postProducts);
router.get('/:id', getProduct);
router.put('/:id', putProducts);
router.delete('/:id', deleteProducts);

//callback functions

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
      // console.log('this is in getProduct w id', result);
      return response.status(200).json(result); 
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
    .then( result => {
      console.log('this is in the puPro func', result);
      return response.status(200).json(result); 
    })
    .catch( err=>console.log(err) );
}

function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  return products.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}


module.exports = router;
