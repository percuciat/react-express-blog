"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tokens", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.TEXT,
        unique: true,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tokens");
  },
};
