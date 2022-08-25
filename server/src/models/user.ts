import bcrypt from "bcrypt";

const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      user_name: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      paranoid: true,
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          const salt = 6;
          user.user_password = bcrypt.hashSync(user.user_password, salt);
        },
      },
    }
  );

  userModel.associate = (models) => {
    userModel.belongsTo(models.Role, {
      foreignKey: { name: "role_id", defaultValue: "3" },
      as: "role",
    });
    userModel.hasOne(models.Token, {
      foreignKey: { name: "user_id" },
    });
  };

  return userModel;
};

export default User;
