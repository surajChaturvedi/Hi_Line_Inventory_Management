module.exports = (sequelize, DataTypes) => {
    const issued_books = sequelize.define("issued_books", {
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
        issued_on: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        timestamps: false
    })
    return issued_books;
};