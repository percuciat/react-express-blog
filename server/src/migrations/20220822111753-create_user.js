"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          autoIncrement: false,
        },
        user_name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        user_email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        user_password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        paranoid: true,
        timestamps: true,
        hooks: {
          beforeCreate: (user) => {
            const salt = 6;
            user.user_name = bcrypt.hashSync(user.user_name, salt);
          },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
