const Category = (sequelize, DataTypes) => {
  const categoryModel = sequelize.define(
    "Category",
    {
      category_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      /* category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      }, */
    },
    {
      tableName: "article_category",
      paranoid: true, // soft delete
      sequelize, // We need to pass the connection instance
      timestamps: false,
    }
  );

  // await sequelize.sync();
  /*  await sequelize.models.category.hasMany(sequelize.models.posts, {
    foreignKey: "category_id",
  }); */

  categoryModel.associate = (models) => {
    categoryModel.hasMany(models.Category, {
      foreignKey: "categoryId",
      as: "articles",
    });
  };

  return categoryModel;
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
