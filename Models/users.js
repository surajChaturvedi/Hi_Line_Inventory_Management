module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //associate  
   users.associate = (models) => {
  //   users.hasOne(models.OTP_verifications, { foreignKey: 'user_id' });
    users.hasMany(models.issued_books, { foreignKey: 'user_id' });
  };

  return users;
};
