const { Sequelize, DataTypes } = require("sequelize");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
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



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.users = require("./users")(sequelize, DataTypes);
// db.admin = require("./admin")(sequelize, DataTypes);
// db.books = require("./books")(sequelize, DataTypes);
// db.issuedBooks = require("./issuedbooks")(sequelize, DataTypes);

// db.users.hasMany(db.issuedBooks, { foreignKey: "user_id" });
// db.issuedBooks.belongsTo(db.users, { foreignKey: "user_id" });

// db.books.hasMany(db.issuedBooks, { foreignKey: "book_id" });
// db.issuedBooks.belongsTo(db.books, { foreignKey: "book_id" });
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

module.exports = db;
module.exports = { DataTypes, Sequelize};
module.exports = sequelize;