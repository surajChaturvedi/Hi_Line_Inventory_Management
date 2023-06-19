module.exports = (sequelize, DataTypes) => {
  const book_borrower = sequelize.define("book_borrower", {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
  
  });
  book_borrower.associate = (models) => {
    book_borrower.belongsTo(models.books, {
        foreignKey: "book_id",
      //  onDelete: "CASCADE",
    });
    book_borrower.belongsTo(models.users, {
        foreignKey: "user_id",
    })

}
  return book_borrower;
};
