const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Config/Config");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.book_borrower = require("../Models/book_borrower")(sequelize, DataTypes);
db.books = require("../Models/books")(sequelize, DataTypes);
db.admin = require("../Models/admin")(sequelize, DataTypes);
db.users = require("../Models/users")(sequelize, DataTypes);

db.sequelize.sync();

module.exports = db;
