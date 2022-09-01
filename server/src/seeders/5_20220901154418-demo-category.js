"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: "31cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          category_name: "cats",
          author: "Peter David",
        },
        {
          id: "33cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          category_name: "dogs",
          author: "Peter David",
        },
        {
          id: "34cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
          category_name: "history",
          author: "Alfred Robben",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
