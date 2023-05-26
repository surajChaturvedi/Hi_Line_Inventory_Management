const Sequelize = require("");
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// db.products = require("../models/product")(sequelize, DataTypes);
db.users = require("../Models/users.js")(sequelize, DataTypes);

module.exports = db;