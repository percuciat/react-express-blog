"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      role_name: {
        type: Sequelize.ENUM,
        values: ["admin", "user", "viewer"],
        unique: true,
        defaultValue: "viewer",
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Roles");
  },
};
