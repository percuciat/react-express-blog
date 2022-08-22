/*

No. Sequelize sync will create tables that do not exists. If you already have all the tables, it will not do anything. However if you use force: true, it will drop the table that exists and recreate them from the model definition.

*/

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
      user_name: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "user_name",
        },
      },
    },
    {
      paranoid: true,
      tableName: "Authors",
      sequelize,
      timestamps: false,
    }
  );

  return authorModel;
};

export default Author;
