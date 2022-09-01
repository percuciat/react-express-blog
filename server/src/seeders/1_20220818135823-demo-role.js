"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          role_name: "admin",
        },
        {
          id: 2,
          role_name: "user",
        },
        {
          id: 3,
          role_name: "viewer",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
