import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
} from "sequelize";
import sequelize from "../config/sequelize";

export interface PostModel
  extends Model<
    InferAttributes<PostModel>,
    InferCreationAttributes<PostModel>
  > {
  id: CreationOptional<string>;
  title: string;
  content: string;
  status: string;
  updatedby: string;
}

export type PostType = ModelStatic<PostModel>;

export const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ["No published", "Published"],
      allowNull: false,
      defaultValue: "No published",
    },
    updatedby: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
    tableName: "Posts",
    timestamps: true,
  }
) as ModelStatic<PostModel>;
