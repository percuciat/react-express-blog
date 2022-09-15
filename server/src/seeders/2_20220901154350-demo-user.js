"use strict";
const bcrypt = require("bcrypt");
const salt = 6;
// pass 12345

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "50cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          user_name: "Frank",
          user_email: "kiol@test.com",
          user_password: bcrypt.hashSync("12345", salt),
          createdAt: new Date(),
          updatedAt: new Date(),
          role_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
