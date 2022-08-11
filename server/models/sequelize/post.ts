import { DataTypes, Model } from "sequelize";

const Post = (sequelize) => {
  sequelize.define(
    "posts",
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        // allowNull defaults to true
      },
      createdby: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedby: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "posts",
      paranoid: true, // soft delete
      sequelize, // We need to pass the connection instance
      modelName: "posts", // We need to choose the model name
      timestamps: true,
    }
  );

  sequelize.sync();
  return sequelize.models.posts;
};

export default Post;
/* import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
class Person extends Model {
  @Column
  name: string

  @Column
  birthday: Date

  @HasMany(() => Hobby)
  hobbies: Hobby[]
} */
