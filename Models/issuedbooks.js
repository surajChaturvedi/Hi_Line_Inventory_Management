module.exports = (sequelize, DataTypes) => {
  const issuedBooks = sequelize.define(
    "issued_books",
    {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        book_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        issued_on: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    },
    {
      timestamps: false,
    }
  );

  issuedBooks.associate = (models) => {
    issuedBooks.belongsTo(models.users, { foreignKey: 'user_id' });
    issuedBooks.belongsTo(models.books, { foreignKey: 'book_id' });
  };

  return issuedBooks;
};
 