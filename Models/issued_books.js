
module.exports = (sequelize, DataTypes) => {
    const issued_books = sequelize.define("issued_books", 
        {
            
            issued_on: {
              type: DataTypes.STRING,
              allowNull: false,
            },
        },

    {
        timestamps : false
        // timestamps: true,
        // createdAt : 'issued_on',
        // updatedAt: false
    })
    return issued_books;
};