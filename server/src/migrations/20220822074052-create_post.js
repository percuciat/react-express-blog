"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Posts",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          autoIncrement: false,
        },
        title: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        status: Sequelize.STRING,
        updatedby: {
          type: Sequelize.STRING,
        },
      },
      {
        paranoid: true,
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
