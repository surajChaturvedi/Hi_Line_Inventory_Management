const { Sequelize, DataTypes } = require("sequelize");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

// connection stablising with mysql
const sequelize = new Sequelize("inventory", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  sequelize.authenticate();

  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

 

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.sync().then(() => { 
//     console.log('TABLES SYNC SUCCESSFUL');
// });


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;