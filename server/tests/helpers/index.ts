import bcrypt from "bcrypt";
import request from "supertest";
import app from "../../src/app";
import sequelize from "../../src/config/sequelize";

const SALT = 8;
const API_REGISTRATION = `${process.env.API_BASE || 'api'}/auth/registration`;
const API_LOGIN = `${process.env.API_BASE || 'api'}/auth/login`;

const USER_TEST = {
  name: "User test",
  email: "user@test.com",
  password: bcrypt.hashSync("12345", SALT),
  password_confirm: '12345',
};

async function startDatabase() {
  await sequelize.sync({ force: true });
}

async function registration() {
  await startDatabase();
  await request(app).post(API_REGISTRATION).send(USER_TEST);
}

async function login() {
  await registration();
  const response = await request(app).post(API_LOGIN).send(USER_TEST);
  return response.headers["set-cookie"][0];
}

export const helper = {
  USER_TEST,
  login,
};
