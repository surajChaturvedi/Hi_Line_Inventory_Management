const { Sequelize, DataTypes } = require("sequelize");
// connection stablising with mysql
const sequelize = new Sequelize("inventory", "root", "mysql", {
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


module.exports = sequelize;