import db from "../config";
import { compareSync } from "bcrypt";
/* import { v4 } from "uuid"; */
import {
  DataBaseError,
  ServerError,
  AuthenticationError,
} from "../helpers/errors";
import type { Error } from "sequelize";

class AuthRepository {
  repo: any;

  constructor() {
    this.repo = db.User;
    // this.redisDB = connectRedis();
    // For Development
  }

  async registrationUser(userInfo) {
    try {
      const { user_name, user_email } = userInfo;
      const user = await this.repo.findOne({
        where: {
          user_name: user_name,
          user_email: user_email,
        },
      });
      if (user) {
        throw new DataBaseError(`${"User already registred"}`);
      }
      const userNew = await this.repo.create({
        ...userInfo,
        role_name: "3",
      });
      return userNew;
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async loginUser(userInfo) {
    try {
      const { user_name, user_password } = userInfo;
      const userInDB = await this.repo.findOne({
        where: {
          user_name: user_name,
        },
      });
      if (!userInDB || !compareSync(user_password, userInDB.user_password)) {
        throw new AuthenticationError(`${"Invalid credentials"}`);
      }
      return userInDB;
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }
}

export default new AuthRepository();
