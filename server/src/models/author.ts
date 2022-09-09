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
import { Category } from "./category";

interface AuthorModel
  extends Model<
    InferAttributes<AuthorModel>,
    InferCreationAttributes<AuthorModel>
  > {
  id: CreationOptional<string>;
  author_name: string;
}

export type AuthorType = ModelStatic<AuthorModel>;

export const Author = sequelize.define<AuthorModel>(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    author_name: {
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
    tableName: "Authors",
    timestamps: false,
  }
) as ModelStatic<AuthorModel>;

Author.hasMany(Category, {
  foreignKey: "author_id",
  as: "category_author",
});
Category.belongsTo(Author, {
  foreignKey: "author_id",
  as: "category_author",
});
Author.hasMany(Post, {
  foreignKey: "author_id",
  as: "post_author",
});
Post.belongsTo(Author, {
  foreignKey: "author_id",
  as: "post_author",
});
