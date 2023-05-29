module.exports = (sequelize, DataTypes) => {
    const OTPVerificationSchema = sequelize.define(
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
          OTP: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
      },
      {
        timestamps: true,
        createdAt : 'created_at',
        updatedAt : 'expires_at',
      }
    );
  
    OTPVerificationSchema.associate = (models) => {
        OTPVerificationSchema.belongsTo(models.users, { foreignKey: 'user_id' });
        OTPVerificationSchema.belongsTo(models.admin, { foreignKey: 'admin_id' });
    };
  
    return OTPVerificationSchema;
  };
   