import { DataTypes, Model } from "sequelize";
import Category from "./category";
import { v4 as uuidv4 } from "uuid";

// Sequelize
const Post = async (sequelize) => {
  sequelize.define(
    "posts",
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdby: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedby: {
        type: DataTypes.STRING,
      },
      /*  category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "category_id",
        },
      },  */
    },
    {
      /*  include: [ Category(sequelize) ], */
      tableName: "posts",
      paranoid: true, // soft delete
      sequelize, // We need to pass the connection instance
      modelName: "posts", // We need to choose the model name
      timestamps: true,
    }
  );

  await sequelize.sync({ force: true });
  //await sequelize.models.posts.belongsTo(sequelize.models.category);

  return sequelize.models.posts;
};

export default Post;
