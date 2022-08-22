import { v4 as uuidv4 } from "uuid";

/*
uid: {
          type: Sequelize.UUID,
          defaultValue: () => uuidv4(),
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
*/

const Post = (sequelize, DataTypes) => {
  const postModel = sequelize.define(
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
      status: DataTypes.STRING,
      author: {
        type: DataTypes.STRING,
        references: {
          model: "Authors",
          key: "author_name",
        },
      },
      category: {
        type: DataTypes.STRING,
        references: {
          model: "Categories",
          key: "category_name",
        },
      },
      createdby: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      updatedby: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      tableName: "Posts",
      sequelize,
      timestamps: true,
    }
  );

  return postModel;
};

export default Post;
