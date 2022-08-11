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

export const connect = () => {
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

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  // добавляем в модель конфиг
  db.posts = Post(sequelize);

  return db;
};

/*  default {
  connect,
}; */
/* module.exports = {
  connect,
}; */

/* export default {
  query: (text, params) => pool.query(text, params),
}; */
