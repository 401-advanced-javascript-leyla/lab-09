'ues strict';

const express = require('express');

const router = express.Router();
const Products = require('../models/products/products');

// const productsDB = new Products();

router.post('/api/v1/products', postProduct);

function postProduct(request, response, next){
  return Products.create(request.body)
    .then(newProduct =>{
      response.status(201).json(newProduct);
    })

    .catch(error=>{
      response.status(500).send('ERROR IN CREATING productDB');
    });
}

module.exports = router;