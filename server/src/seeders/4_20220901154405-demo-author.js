"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Authors",
      [
        {
          id: "43cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          author_name: "Peter David",
          user_name: "Frank",
        },
        {
          id: "44cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          author_name: "Alfred Robben",
          user_name: "Frank",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
