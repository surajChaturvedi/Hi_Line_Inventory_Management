module.exports = (sequelize, DataTypes) => {
    const OTPVerification = sequelize.define(
      "OTP_verifications",
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
          email :{
            type: DataTypes.STRING,
            allowNull: false,
          }
      },
      {
        timestamps: true,
        createdAt : 'created_at',
        updatedAt : 'expires_at',
      }
    );
  
    OTPVerification.associate = (models) => {
      OTPVerification.belongsTo(models.users, { foreignKey: 'user_id' });
      OTPVerification.belongsTo(models.admin, { foreignKey: 'admin_id' });
    };
  
    return OTPVerification;
  };
   