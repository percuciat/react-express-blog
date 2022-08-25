const Category = (sequelize, DataTypes) => {
  const categoryModel = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      category_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "Categories",
      paranoid: true,
      timestamps: false,
    }
  );

  categoryModel.associate = (models) => {
    categoryModel.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author_category",
    });
    categoryModel.hasMany(models.Post, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  return categoryModel;
};

export default Category;
