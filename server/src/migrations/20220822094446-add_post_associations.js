"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Posts",
      "category_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
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
      "author_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Authors",
          key: "id",
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
    await queryInterface.removeColumn("Posts", "category_id");
    await queryInterface.removeColumn(
      "Posts", // name of Source model
      "author_id" // key we want to remove
    );
  },
};
