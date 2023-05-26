module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define("books", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_remaining: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return books;
};
