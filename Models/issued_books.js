const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const issued_books = sequelize.define("issued_books", 
        {
            
            issued_on: {
              type: DataTypes.DATEONLY,
              allowNull: false,
            },
           return_date: {
            type: DataTypes.DATEONLY,
            allowNull:true
            
            },
            fine:{
                type:INTEGER,
                allowNull: true
            },
            daysExceeded:{
                type: INTEGER,
                allowNull:true
            }
        },
    {
        timestamps : false
    })

    issued_books.associate = (models) => {
        issued_books.belongsTo(models.books, {
            foreignKey: "book_id"
        }); 
        issued_books.belongsTo(models.users, {
                foreignKey: "user_id",
              //  onDelete: "CASCADE",
            });
             }


    return issued_books;
};