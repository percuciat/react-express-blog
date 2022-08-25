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
  );

  postModel.associate = (models) => {
    postModel.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author",
    });
    postModel.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  /*  postModel.associate = (models) => {
    postModel.belongsTo(models.Author, {
      foreignKey: "author_name",
      as: "author_n",
    });
    postModel.belongsTo(models.Category, {
      foreignKey: "category_name",
      as: "category_n",
    });
  }; */

  return postModel;
};

export default Post;
