const Role = (sequelize, DataTypes) => {
  const roleModel = sequelize.define(
    "Role",
    {
      role_name: {
        type: DataTypes.ENUM,
        values: ["admin", "user", "viewer"],
        unique: true,
        defaultValue: "viewer",
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      paranoid: true,
      tableName: "Roles",
      timestamps: false,
    }
  );
  roleModel.associate = (models) => {
    roleModel.hasMany(models.User, {
      foreignKey: { name: "role_id", defaultValue: "3" },
      as: "role",
    });
  };

  return roleModel;
};

export default Role;
