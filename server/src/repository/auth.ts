import db from "../config";
import { compareSync } from "bcrypt";
/* import { v4 } from "uuid"; */
import { DataBaseError, ClientError } from "../helpers/errors";
import { generateRefreshToken, generateAccessToken } from "../helpers/tokens";
import type { Error } from "sequelize";

class AuthRepository {
  userModel: any;
  tokenModel: any;

  constructor() {
    this.userModel = db.User;
    this.tokenModel = db.Token;
  }

  async registrationUser(userInfo) {
    try {
      const { user_name, user_email } = userInfo;
      const user = await this.userModel.findOne({
        where: {
          user_name: user_name,
          user_email: user_email,
        },
      });
      if (user) {
        throw new DataBaseError(`${"User already registred"}`);
      }
      await this.userModel.create({
        ...userInfo,
      });
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async authenticationUser(userInfo) {
    try {
      const { user_name, user_password } = userInfo;
      const userInDB = await this.userModel.findOne({
        attributes: ["id", "user_name", "user_password", "role_id"],
        where: {
          user_name: user_name,
        },
      });
      if (!userInDB || !compareSync(user_password, userInDB.user_password)) {
        throw new ClientError(403, "Invalid credentials");
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
      await this.tokenModel.create({
        user_id: userId,
        refresh_token: refreshToken,
      });
      return { access_token: token, refresh_token: refreshToken };
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async refreshToken(token: string) {
    try {
      const tokenInDB = await this.tokenModel.findOne({
        where: {
          refresh_token: token,
        },
      });
      if (!tokenInDB) {
        throw new DataBaseError("Token is invalid");
      }
      await this.tokenModel.destroy({
        where: {
          refresh_token: token,
        },
      });
      return tokenInDB.user_id;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }

  async logout(userId: string) {
    try {
      const tokenInDB = await this.tokenModel.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!tokenInDB) {
        throw new DataBaseError("Token is invalid");
      }
      const result = await this.tokenModel.destroy({
        where: {
          user_id: userId,
        },
      });
      return result;
    } catch (error: unknown) {
      let errorDB = error as Error;
      throw new DataBaseError(`${errorDB.message}`);
    }
  }
}

export default new AuthRepository();
