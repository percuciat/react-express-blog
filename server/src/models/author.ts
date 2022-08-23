const Author = (sequelize, DataTypes) => {
  const authorModel = sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      author_name: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      /* user_name: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "user_name",
        },
      }, */
    },
    {
      paranoid: true,
      tableName: "Authors",
      sequelize,
      timestamps: false,
    }
  );

 authorModel.associate = (models) => {
    authorModel.hasMany(models.Category, {
      foreignKey: "authorId",
      as: "author_category",
    });
    authorModel.hasMany(models.Post, {
      foreignKey: "authorId",
      as: "author",
    });
  };

  return authorModel;
};

export default Author;
