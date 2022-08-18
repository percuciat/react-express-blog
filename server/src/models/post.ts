import { v4 as uuidv4 } from "uuid";

const Post = (sequelize, DataTypes) => {
  const postModel = sequelize.define(
    "Post",
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
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
      tableName: "articles",
      paranoid: true, // soft delete
      sequelize, // We need to pass the connection instance
      timestamps: true,
    }
  );

  postModel.associate = (models) => {
    postModel.belongsTo(models.Post, {
      foreignKey: "categoryId",
      as: "article_category",
    });
    postModel.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "article_author",
    });
  };

  // await sequelize.sync({ force: true });
  //await sequelize.models.posts.belongsTo(sequelize.models.category);

  return postModel;
};

export default Post;
