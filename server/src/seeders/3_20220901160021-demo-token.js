"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tokens",
      [
        {
          id: 1,
          refresh_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwY2YyZmU0LWUxNzYtNDdiZi1iOWUzLTRjMmE3M2NiNWM4NiJ9.opiQsgD7aqRqjneTVxXsW2GEB3LQM4SYRBxyrDOBDUU",
          user_id: "50cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tokens", null, {});
  },
};
