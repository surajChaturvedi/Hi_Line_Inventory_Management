const model = require("../models");

class IssuedBooksServices {
  create(data, queryOptions) {
    return new Promise((resolve, reject) => {
      model.issuedbooks
        .create(data, queryOptions)
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
    return new Promise((resolve, reject) => {
      model.issuedbooks
        .findOne(queryOptions)
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
      model.issuedbooks
        .update(data, queryOptions)
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
    return new Promise((resolve, reject) => {
      model.issuedbooks
        .findAll(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  findAndCountAll(queryOptions) {
    return new Promise((resolve, reject) => {
      model.issuedbooks
        .findAndCountAll(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  destroy(queryOptions) {
    return new Promise((resolve, reject) => {
      model.issuedbooks
        .destroy(queryOptions)
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

  count(queryOptions) {
    return Promise((resolve, reject) => {
      model.issuedbooks
        .count(queryOptions)
        .then((result) => {
          result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = new IssuedBooksServices();
