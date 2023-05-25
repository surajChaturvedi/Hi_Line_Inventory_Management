const {Sequelize, Datatype} = require ('sequelize');
// connection stablising with mysql
const sequelize = new Sequelize("customer", "root", "mysql", {
    host: "localhost",
    dialect: "mysql",
    //port: "3307",
    logging: false,
})

try {
    sequelize.authenticate();
  
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

module.exports = sequelize