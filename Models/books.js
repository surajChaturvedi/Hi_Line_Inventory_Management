module.exports = (sequelize, DataTypes) => {
    const books = sequelize.define("books", {
      book_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },{
        timestamps : false
    });

    books.associate = (models) => {
      books.hasMany(models.issued_books, { foreignKey: 'book_id' });
    };

    return books;
  };