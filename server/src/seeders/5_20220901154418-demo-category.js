"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          category_name: "cats",
          createdAt: new Date(),
          updatedAt: new Date(),
          author_id: 1,
        },
        {
          id: 2,
          category_name: "dogs",
          createdAt: new Date(),
          updatedAt: new Date(),
          author_id: 1,
        },
        {
          id: 3,
          category_name: "history",
          createdAt: new Date(),
          updatedAt: new Date(),
          author_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
