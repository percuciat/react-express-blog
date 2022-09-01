"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Users",
      "role_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
          default: '3'
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      {
        tableName: "Users",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Users",
      "role_id"
    );
  },
};
