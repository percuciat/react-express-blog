"use strict";
const bcrypt = require("bcrypt");
const salt = 6;
// pass 12345

module.exports = {
  async up(queryInterface, Sequelize) {
    /* const roles = await queryInterface.sequelize.query(
      `SELECT id from ROLES;`
    );
    console.log('roles--', roles);
    process.exit(1);
    const rolesRows = roles[0]; */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "50cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          user_name: "Frank",
          user_email: "kiol@test.com",
          user_password: bcrypt.hashSync("12345", salt),
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
