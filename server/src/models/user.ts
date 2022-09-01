import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ModelStatic,
} from "sequelize";
import sequelize from "../config/sequelize";
import { Token } from "./token";
import bcrypt from "bcrypt";

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<string>;
  user_name: string;
  user_email: string;
  user_password: string;
}

export type UserType = ModelStatic<UserModel>;

export const User = sequelize.define<UserModel>(
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
      beforeCreate: (user: UserModel) => {
        const salt = 6;
        user.user_password = bcrypt.hashSync(user.user_password, salt);
      },
    },
  }
) as ModelStatic<UserModel>;

User.hasOne(Token, {
  as: "User",
  foreignKey: { name: "user_id" },
});
Token.belongsTo(User, {
  as: "User",
  foreignKey: { name: "user_id" },
});
