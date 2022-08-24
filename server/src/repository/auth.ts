import db from "../config";
import { compareSync } from "bcrypt";
/* import { v4 } from "uuid"; */
import {
  DataBaseError,
  NotFoundError,
  ServerError,
  AuthenticationError,
} from "../helpers/errors";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../helpers/generateToken";
import type { Error } from "sequelize";

class AuthRepository {
  repo: any;
  token: any;

  constructor() {
    this.repo = db.User;
    this.token = db.Token;
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
      await this.repo.create({
        ...userInfo,
        role_name: "3",
      });
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async authenticationUser(userInfo) {
    try {
      const { user_name, user_password } = userInfo;
      const userInDB = await this.repo.findOne({
        attributes: ["id", "user_name", "user_password", "role_name"],
        where: {
          user_name: user_name,
        },
      });
      if (!userInDB || !compareSync(user_password, userInDB.user_password)) {
        throw new AuthenticationError("Invalid credentials");
      }
      return userInDB;
    } catch (error: any) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async generateTokens(userId: string) {
    try {
      const token = generateAccessToken({
        id: userId,
      });
      const refreshToken = generateRefreshToken({
        id: userId,
      });
      await this.token.create({
        user_id: userId,
        refresh_token: refreshToken,
      });
      return { access_token: token, refresh_token: refreshToken };
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async refreshToken(token: string) {
    try {
      const tokenInDB = await this.token.findOne({
        where: {
          refresh_token: token,
        },
      });
      if (!tokenInDB) {
        // NotFoundError
        throw new DataBaseError("Invalid credentials");
      }
      await this.token.destroy({
        where: {
          refresh_token: token,
        },
      });
      return tokenInDB.user_id;
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async logout(userId: string) {
    try {
      const tokenInDB = await this.token.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!tokenInDB) {
        throw new DataBaseError("Invalid credentials id");
      }
      const result = await this.token.destroy({
        where: {
          user_id: userId,
        },
      });
      return result;
    } catch (error: unknown) {
      console.log("error--", error);
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }
}

export default new AuthRepository();
