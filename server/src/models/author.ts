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
  id: CreationOptional<number>;
  author_name: string;
  updatedAt?: CreationOptional<string>;
  createdAt?: CreationOptional<string>;
  deletedAt?: CreationOptional<string>;
}

export type AuthorType = ModelStatic<AuthorModel>;

export const Author = sequelize.define<AuthorModel>(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "code cannot be empty",
        },
      },
    },
  },
  {
    paranoid: true,
    tableName: "Authors",
    timestamps: true,
    hooks: {
      beforeCreate: (author: AuthorModel) => {
        author.author_name = author.author_name.toLowerCase();
      },
    },
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
