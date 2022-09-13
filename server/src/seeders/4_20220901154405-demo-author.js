"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Authors",
      [
        {
          author_name: "Peter David",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: "50cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        },
        {
          author_name: "Alfred Robben",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: "50cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
