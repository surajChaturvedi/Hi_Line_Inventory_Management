const { json } = require("body-parser");
const model = require("../models");
const { error } = require("../validation/auth.validation");

class UserServices {
  create(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.users.create(data, queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }

  findOne(queryOptions) {
    return new Promises((resolve, reject) => {
      model.users.findOne(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  update(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.users.update(data, queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          if (queryOptions && queryOptions.transaction) {
            queryOptions.transaction.rollback();
          }
          reject(error);
        });
    });
  }

  findAll(queryOptions) {
    return new Promises((resolve, reject) => {
      model.users.findAll(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  findAndCountAll(queryOptions){
    return new Promises((resolve, reject)=>{
        model.users.findAndCountAll(queryOptions)
        .then((result)=>{
            result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
            reject(error);
        });
    });
  }

  destroy(queryOptions) {
    return new Promises((resolve, reject) =>{
        model.users.destroy(queryOptions)
        .then((result) => {
            result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
            if(queryOptions && queryOptions.transaction) {
                queryOptions.transaction.rollback();
            }
            reject(error);
        });
    });
  }

  count(queryOptions) {
    return Promise((resolve,reject) => {
        model.users.count(queryOptions)
        .then((result) => {
            result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error)=>{
            reject(error);
        })
    })
  }

}

module.exports = new UserServices();
