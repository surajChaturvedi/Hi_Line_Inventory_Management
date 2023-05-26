const config=require("../Config/Config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("inventory", "root", "mysql", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
  // operatorsAliases: false, 
});

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.users = require("./users")(sequelize, DataTypes);

  db.sequelize.sync();

  module.exports = db;

