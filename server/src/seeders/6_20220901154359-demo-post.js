"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [
      {
        id: "11cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "Post 1",
        content: "content 1",
        status: "No published",
        updatedby: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 1,
        category_id: 1,
      },
      {
        id: "23cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "Post 2",
        content: "content 2",
        status: "No published",
        updatedby: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 1,
        category_id: 2,
      },
      {
        id: "19cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "Post 3",
        content: "content 3",
        status: "No published",
        updatedby: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 2,
        category_id: 3,
      },
      {
        id: "18cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "Post 4 Alfred Robben",
        content: "content 4 Alfred Robben",
        status: "Published",
        updatedby: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 2,
        category_id: 3,
      },
      {
        id: "15cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "Post 5",
        content: "content 5",
        status: "No published",
        updatedby: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 1,
        category_id: 2,
      },
    ];
    await queryInterface.bulkInsert("Posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
