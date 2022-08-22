import { Sequelize } from "sequelize";
import configDB from "./configDB";

const { database, username, password, host, port, dialect } = configDB;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: +port,
  dialect: dialect,
  pool: {
    max: 10,
    min: 0,
    acquire: 20000,
    idle: 5000,
  },
});

export default sequelize;
