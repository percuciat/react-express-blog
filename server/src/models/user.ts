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
      sequelize,
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.user_name = bcrypt.hashSync(user.user_name, salt);
        },
      },
    }
  );

  userModel.associate = (models) => {
    userModel.belongsTo(models.Role, {
      foreignKey: "role_name",
      as: "role",
    });
  };

  return userModel;
};

export default User;
