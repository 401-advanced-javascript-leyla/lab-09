'ues strict';

const express = require('express');

const router = express.Router();
const Categories = require('../models/categories/categories');

// const categoriesDB = new Categories();

router.post('/api/v1/products', postCategories);

function postCategories(request, response, next){
  return Categories.create(request.body)
    .then(newCategory =>{
      response.status(201).json(newCategory);
    })

    .catch(error=>{
      response.status(500).send('ERROR IN CREATING categoryDB');
    });
}

module.exports = router;