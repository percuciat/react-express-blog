"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Posts",
      "category",
      {
        type: Sequelize.STRING,
        references: {
          model: "Categories",
          key: "category_name",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      {
        tableName: "Posts",
      }
    );
    await queryInterface.addColumn(
      "Posts",
      "author",
      {
        type: Sequelize.STRING,
        references: {
          model: "Authors",
          key: "author_name",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      {
        tableName: "Posts",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Posts",
      "category"
    );
    await queryInterface.removeColumn(
      "Posts", // name of Source model
      "author" // key we want to remove
    );
  },
};
