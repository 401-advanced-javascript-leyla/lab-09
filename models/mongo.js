'use strict';

/** Class representing a generic mongo model. */
class Model {

  /**
   * Model Constructor
   * @param schema {object} - mongo schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Retrieves one or more records
   * @param _id {string} optional mongo record id
   * @returns {count:#,results:[{*}]} | {*}
   */
  get(_id) {
    if(_id){
    //   console.log('got in get method and check id', _id);
      // console.log('this is the id obj it found',schema.findOne({_id}));
      return this.schema.findOne({_id})
        .then(results => {
          console.log(results);
          return results;
        })
        .catch(error => console.log(error));
        
    }else{
      return this.schema.find()
        .then(result=>{
          return {count: result.length, results: result};
        })
        .catch((error) => {
          throw error;
        });
    }
    // return Promise.reject(new Error('Invalid Id'));

  }

  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  create(record) {
    // Call the appropriate mongoose method to create a new record
    const newRecord = new this.schema(record);
    //this will return a resolved promise into a new product
    return newRecord.save();

  }

  /**
   * Replaces a record in the database
   * @param _id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id,record, {new:true});

  }

  /**
   * Deletes a recod in the model
   * @param _id {string} Mongo Record ID
   * @returns {*}
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);

  }

}

module.exports = Model;