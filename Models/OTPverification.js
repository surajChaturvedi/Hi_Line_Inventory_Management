module.exports = (sequelize, DataTypes) => {
  const OTPverification = sequelize.define(
    "OTP_verification",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "expires_at",
    }
  );
  OTPverification.associate = (models) => {
    OTPverification.belongsTo(models.users, {
      foreignKey: "user_id",
    });
    OTPverification.belongsTo(models.admin, {
      foreignKey: "admin_id",
    });
  };
  return OTPverification;
};
