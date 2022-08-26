import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
} from "sequelize";
import sequelize from "../config/sequelize";
import { User } from "./user";

interface RoleModel
  extends Model<
    InferAttributes<RoleModel>,
    InferCreationAttributes<RoleModel>
  > {
  role_name: "admin" | "user" | "viewer";
}

export type RoleType = ModelStatic<RoleModel>;

export const Role = sequelize.define<RoleModel>(
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
) as ModelStatic<RoleModel>;
/* 
belongsTo association in the same file that you set the hasMany 
or the hasOne association.
*/
Role.hasMany(User, {
  foreignKey: { name: "role_id", defaultValue: "3" },
  as: "role",
});
User.belongsTo(Role, {
  foreignKey: { name: "role_id", defaultValue: "3" },
  as: "role",
});
