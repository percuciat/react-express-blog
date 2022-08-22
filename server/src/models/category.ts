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
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      author: {
        type: DataTypes.STRING,
        references: {
          model: "Authors",
          key: "author_name",
        },
      },
    },
    {
      tableName: "Categories",
      paranoid: true,
      sequelize,
      timestamps: false,
    }
  );

  /* categoryModel.associate = (models) => {
   categoryModel.belongsTo(models.Author, {
      foreignKey: "author",
      as: "author_name",
    });
    categoryModel.hasMany(models.Post, {
      foreignKey: "category_name",
      as: "category",
    }); 
  };*/

  return categoryModel;
};

export default Category;
