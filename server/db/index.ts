/* const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_TABLE,
  password: "root",
  port: process.env.DB_PORT,
}); */

import { Sequelize, Model, DataTypes } from "sequelize";
import Post from "../models/sequelize/post";
/* const logger = require("../logger/api.logger"); */

export const connect = async () => {
  // TODO: разобраться с .env
  const user = "postgres";
  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  // TODO: разобраться с .env
  const password = "root";
  const port = process.env.DB_PORT;
  const dialect = "postgres";

  const sequelize = new Sequelize(database as any, user, password, {
    host: host,
    dialect: dialect,
    port: 5432,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });
  /* try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } */
  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  // todo: только в 1 месте force
  // await sequelize.sync({ force: true });
  // добавляем в модель конфиг
  //db.posts = Post(sequelize);

  return db;
};
