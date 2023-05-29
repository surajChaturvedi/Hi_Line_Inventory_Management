 module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define("admin", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      // allow null default to true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return admin;
};
