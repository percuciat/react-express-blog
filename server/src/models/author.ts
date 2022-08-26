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
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    author_name: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
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
  foreignKey: "authorId",
  as: "author_category",
});
Category.belongsTo(Author, {
  foreignKey: "authorId",
  as: "author_category",
});
Author.hasMany(Post, {
  foreignKey: "authorId",
  as: "author",
});
Post.belongsTo(Author, {
  foreignKey: "authorId",
  as: "author",
});
