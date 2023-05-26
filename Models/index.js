const config = require("../Config/Config");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);

db.sequelize.sync();

module.exports = db;
