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
  id: CreationOptional<number>;
  category_name: string;
  updatedAt?: CreationOptional<string>;
  createdAt?: CreationOptional<string>;
  deletedAt?: CreationOptional<string>;
}

export type CategoryType = ModelStatic<CategoryModel>;

export const Category = sequelize.define<CategoryModel>(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "Categories",
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeCreate: (category: CategoryModel) => {
        category.category_name = category.category_name.toLowerCase();
      },
    },
  }
) as ModelStatic<CategoryModel>;

Category.hasMany(Post, {
  foreignKey: "category_id",
  as: "post_category",
});
Post.belongsTo(Category, {
  foreignKey: "category_id",
  as: "post_category",
});
