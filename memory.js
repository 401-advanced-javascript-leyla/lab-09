'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(entry) {
    console.log('got in create and this is entry', entry);
    entry.id = uuid();
    console.log('got in create and this is entryid', entry.id);

    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    console.log('this is in the update function',record);
    // entry.id = uuid();
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    // console.log(this.database);
    return Promise.resolve(this.database);
  }



  // Vinicio - this would be our 'isValid', but it changes the data if it finds anything wrong
  sanitize(entry) {
    console.log('got in sanitize', entry);
    let valid = true;
    let record = {};
    // Vinicio - this code is checking that properties are present in objects
    // Vinicio - your goal is to change that to check for types as well
    // Please take inspiration from lab 02

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        if (entry[field]) {
          // console.log('got in there is entry[field]');

          if(typeof entry[field] === this.schema[field].type){
            // console.log('got in typecheck for entry[field]',entry[field]);
            record[field] = entry[field];

          }else{
            // console.log('entry[field] type check failed',entry[field]);
            valid = false;
          }

        } else {
          // console.log('there is no entry[field] ',entry[field]);
          valid = false;
        }
      }
      else {
        // console.log('got in no required');
        if(typeof entry[field] === this.schema[field].type){
          // console.log('entry[field] type check');
          record[field] = entry[field];
        }  
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;