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
        // console.log(response);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
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
        return (mockRequest.put(`/api/v1/products/${result.body._id}`)).send(updateProduct);
      })
      
      .then(response=>{
        // console.log('this is in the putProduct test, response:', response);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
      });
  });

  it('Deleting a product with the id from params and return 200',()=>{
    const testProduct = {
      name: 'sushi',
      description: 'There are some sushi',
      quantity: 13,
    };
    return mockRequest.post('/api/v1/products')
  
      .send(testProduct)
      .then(result=>{
        return (mockRequest.delete(`/api/v1/products/${result.body._id}`));
      })
      
      .then(response=>{
        // console.log('this is in the deleteProduct test, response:', response);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
      });

  });

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
        expect(response.body.count).toEqual(5);
      });
  });

  //tests for categories

  it('Getting the category with the id from request params and return 200', () => {
    const testCategory = {
      name: 'sushi',
      description: 'There are some sushi',
      quantity: 15,
    };
    
    return mockRequest.post('/api/v1/categories')

      .send(testCategory)
      .then((result)=>{
        return (mockRequest.get(`/api/v1/categories/${result.body._id}`));
      })

      .then(response => {
        // console.log(response);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });
  });

  it('Creating a new category should return 201 and the created object', () => {
    const testCategory = {
      name: 'fish',
      description: 'There are some fish',
      quantity: 100,
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategory)
      .then(response => {
        // console.log('got in create test for product',response);
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('fish');
      });
  });

  it('Updating a category with the id from params and the request.body and return 200',()=>{
    const testCategory = {
      name: 'flowers',
      description: 'There are some flower',
      quantity: 20,
    };

    const updateCategory = {
      name: 'flowers',
      description: 'There are some flower',
      quantity: 30,
    };
      
    return mockRequest.post('/api/v1/categories')
  
      .send(testCategory)
      .then(result=>{
        return (mockRequest.put(`/api/v1/categories/${result.body._id}`)).send(updateCategory);
      })
      
      .then(response=>{
        // console.log('this is in the putProduct test, response:', response);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });
  });

  it('Deleting a category with the id from params and return 200',()=>{
    const testCategory = {
      name: 'sushi',
      description: 'There are some sushi',
      quantity: 13,
    };
    return mockRequest.post('/api/v1/categories')
  
      .send(testCategory)
      .then(result=>{
        return (mockRequest.delete(`/api/v1/categories/${result.body._id}`));
      })
      
      .then(response=>{
        // console.log('this is in the deleteCategory test, response:', response);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });

  });


});