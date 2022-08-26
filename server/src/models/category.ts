import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
} from "sequelize";
import sequelize from "../config/sequelize";
import { Post } from "./post";

export interface CategoryModel
  extends Model<
    InferAttributes<CategoryModel>,
    InferCreationAttributes<CategoryModel>
  > {
  id: CreationOptional<string>;
  category_name: string;
}

export type CategoryType = ModelStatic<CategoryModel>;

export const Category = sequelize.define<CategoryModel>(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    category_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "Categories",
    paranoid: true,
    timestamps: false,
  }
) as ModelStatic<CategoryModel>;

Category.hasMany(Post, {
  foreignKey: "categoryId",
  as: "category",
});
Post.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});
