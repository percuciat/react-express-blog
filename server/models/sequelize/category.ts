import { DataTypes, Model } from "sequelize";
import Post from "./post";
import { v4 as uuidv4 } from "uuid";

const Category = async (sequelize) => {
  sequelize.define(
    "category",
    {
      uid: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        unique: true,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: "post_category",
      paranoid: true, // soft delete
      sequelize, // We need to pass the connection instance
      timestamps: false,
    }
  );

  await sequelize.sync();
  await sequelize.models.category.hasMany(sequelize.models.posts, {
    foreignKey: "category_id",
  });

  return sequelize.models.category;
};

export default Category;
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
