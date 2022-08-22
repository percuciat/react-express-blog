"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Authors",
      "user_name",
      {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "user_name",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      {
        tableName: "Authors",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Authors",
      "user_name"
    );
  },
};
