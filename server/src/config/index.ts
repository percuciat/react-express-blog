import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import Post from "../models/post";
import Author from "../models/author";
import Category from "../models/category";
import User from "../models/user";
import Role from "../models/role";

const db: any = {};
db.Post = Post(sequelize, DataTypes);
db.Category = Category(sequelize, DataTypes);
db.Author = Author(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);
db.Role = Role(sequelize, DataTypes);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
