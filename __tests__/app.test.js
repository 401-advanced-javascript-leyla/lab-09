'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('Products API', () => {

  it('Getting all the products data from and return 201', () => {
    const testProduct = {
      name: 'fish',
      description: 'There are some fish',
      quantity: 100,
    };
  
    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(()=>{
        return mockRequest.get('/api/v1/products');
      })  
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(1);
      });
  });

  it('Getting the product with the id from request params and return 200', () => {
    const testProduct = {
      name: 'sushi',
      description: 'There are some sushi',
      quantity: 15,
    };
    
    return mockRequest.post('/api/v1/products')

      .send(testProduct)
      .then((result)=>{
        return (mockRequest.get(`/api/v1/products/${result.body._id}`));
      })

      .then(response => {
        console.log(response);
        expect(response.status).toEqual(200);
        expect(response.body._id).toEqual(testProduct._id);
      });
  });

  it('Creating a new product should return 201 and the created object', () => {
    const testProduct = {
      name: 'fish',
      description: 'There are some fish',
      quantity: 100,
    };

    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(response => {
        // console.log('got in create test for product',response);
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('fish');
      });
  });

  it('Updating a product with the id from params and the request.body and return 200',()=>{
    const testProduct = {
      name: 'flowers',
      description: 'There are some flower',
      quantity: 20,
    };

    const updateProduct = {
      name: 'flowers',
      description: 'There are some flower',
      quantity: 30,
    };
      
    return mockRequest.post('/api/v1/products')
  
      .send(testProduct)
      .then(result=>{
        return (mockRequest.put(`/api/v1/products/${result.body._id}`));
      })
      .send(updateProduct);
      .then(response=>{
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('');
      });
  });

  //   it('Deleting a product with the id from params and return 200',()=>{
      
  //   });


});