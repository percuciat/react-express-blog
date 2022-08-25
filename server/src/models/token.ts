import bcrypt from "bcrypt";

const Token = (sequelize, DataTypes) => {
  const tokenModel = sequelize.define(
    "Token",
    {
      refresh_token: {
        type: DataTypes.TEXT,
        unique: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );

  tokenModel.associate = (models) => {
    tokenModel.belongsTo(models.User, {
      foreignKey: { name: "user_id" },
    });
  };

  return tokenModel;
};

export default Token;
