const {Sequelize, DataTypes} = require ('sequelize');
// connection stablising with mysql
const sequelize = new Sequelize("inventory", "root", "mysql", {
    host: "localhost",
    dialect: "mysql",
    port: 3307,
    logging: false
})

try {
    sequelize.authenticate();
  
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

// module.exports = sequelize
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// db.products = require("../models/product")(sequelize, DataTypes);
db.users = require("../Models/users.js")(sequelize, DataTypes);

module.exports = db;