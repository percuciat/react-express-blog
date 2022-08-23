const Role = (sequelize, DataTypes) => {
  const roleModel = sequelize.define(
    "Role",
    {
      role_name: {
        type: DataTypes.ENUM,
        values: ["admin", "user", "viewer"],
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      paranoid: true,
      tableName: "Roles",
      sequelize,
      timestamps: false,
    }
  );
  roleModel.associate = (models) => {
    roleModel.hasMany(models.User, {
      foreignKey: "role_name",
      as: "role",
    });
  };

  return roleModel;
};

export default Role;
