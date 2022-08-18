
/*

No. Sequelize sync will create tables that do not exists. If you already have all the tables, it will not do anything. However if you use force: true, it will drop the table that exists and recreate them from the model definition.

*/

const Author = (sequelize, DataTypes) => {
  const authorModel = sequelize.define(
    "Author",
    {
      author_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    },
    {
      tableName: "article_author",
      paranoid: true,
      sequelize,
      timestamps: false,
    }
  );

  authorModel.associate = (models) => {
    authorModel.hasMany(models.Post, {
      foreignKey: 'authorId',
      as: 'articles'
    })
  }

  return authorModel;
};

export default Author;