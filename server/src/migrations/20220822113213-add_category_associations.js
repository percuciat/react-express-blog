"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Categories",
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
        tableName: "Categories",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Categories",
      "author"
    );
  },
};
