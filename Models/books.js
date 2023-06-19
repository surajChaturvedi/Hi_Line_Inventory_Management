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
  },
  {
    timestamps : false,
  });

  // for stablising assocation with table books table to issued table
  books.associate = (models) => {
    books.hasMany(models.issued_books, {
      foreignKey: "book_id",
    });

    // Assocition for the books to the book_borrower
    books.associate = (models) => {
      books.hasMany(models.book_borrower, {
        foreignKey: "book_id",
      });
    }
  }
// for stablising assocation with table books table to borrower table
  return books;
};
