const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Config/Config");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);

db.sequelize.sync();

module.exports = db;
module.exports = { DataTypes, Sequelize};
module.exports = sequelize;