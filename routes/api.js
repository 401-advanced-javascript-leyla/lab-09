'use strict';

const express =  require('express');

const modelLoader = require('../src/middleware/model-loader');

const router = express.Router();


router.param('model', modelLoader);

/**
 * @route GET /api/v1/:model
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.get('/api/v1/:model', handleGetAll);


/**
 * @route GET /api/v1/:model/:id
 * @param {string} request.params.id - id requested for finding the data
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.get('/api/v1/:model/:id', handleGetOne);

/**
 * @route POST /api/v1/:model
 * @param {object} a new object that will be inserted into the database
 * @returns {string} 201 a status code means created
 * @returns {object}  return the created data
 * @returns {Error} returns an error
 */
router.post('/api/v1/:model', handleCreate);

/**
 * @route PUT /api/v1/:model/:id
 * @param {string} request.params.id - id requested for finding the data that to be updated
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.put('/api/v1/:model/:id', handleUpdate);

/**
 * @route DELETE /api/v1/:model/:id
 * @param {string} request.params.id - id requested for finding the data to be deleted
 * @returns {string} 200 a status code means okay
 * @returns {object}  return all the data
 * @returns {Error} returns an error
 */
router.delete('/api/v1/:model/:id', handleDelete);

/**
   * handler function for the route to get data from database
   * @param request {object}
   * @param response {object}
   * @param next {function} a middleware function for the route to get data from the database
   * @returns {string} the status code 200 and {object}
   */

function handleGetAll(request,response,next) {
  // expects an array of objects back
  request.model.get()
    .then( data => {
      const output = {
        count: data.count,
        results: data.results,
      };
        // console.log('this is in getProducts', output);
      return response.status(200).json(output);
    })
    .catch( err=>console.log(err) );
}

/**
   * handler function for the route to get one data with the given id from database
   * @param request {object}
   * @param response {object}
   * @param request.params.id {string}
   * @param next {function} a middleware function for the route to get data with the id from the database
   * @returns {string} the status code 200 and {object}
   */

function handleGetOne(request,response,next) {
  // expects an array with one object in it
  request.model.get(request.params.id)
    .then( result => {
      // console.log('this is in getProduct w id', result);
      return response.status(200).json(result);
    })
    .catch( err=>console.log(err) );
}

/**
   * handler function for the route to create data from database with the request.body
   * @param request {object}
   * @param response {object}
   * @param request.body {object}
   * @param next {function} a middleware function for the route to create data from the database
   * @returns {string} the status code 201 and {object}
   */

function handleCreate(request,response,next) {
  // expects the record that was just added to the database
  request.model.create(request.body)
    .then( result => {
      // console.log('this is in postProducts',result);
      return response.status(201).json(result);
    })
    .catch( err=>console.log(err) );
}

/**
   * handler function for the route to delete one data with the given id from database
   * @param request {object}
   * @param response {object}
   * @param request.params.id {string}
   * @param request.body {object}
   * @param next {function} a middleware function for the route to delete data from the database
   * @returns {string} the status code 200 and {object}
   */


function handleUpdate(request,response,next) {
  // expects the record that was just updated in the database
  request.model.update(request.params.id, request.body)
    .then( result => {
    //   console.log('this is in the puPro func', result);
      return response.status(200).json(result);
    })
    .catch( err=>console.log(err) );
}

function handleDelete(request,response,next) {
  // Expects no return value (the resource should be gone)
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( err=>console.log(err) );
}


module.exports = router;
