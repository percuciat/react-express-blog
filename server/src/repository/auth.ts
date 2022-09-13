import { compareSync } from "bcrypt";
import { ServerError, ClientError } from "../helpers/errors";
import { generateRefreshToken, generateAccessToken } from "../helpers/tokens";
import type { Error } from "sequelize";

import { User, UserType, UserModel } from "../models/user";
import { Token, TokenType } from "../models/token";
import { Role, RoleType } from "../models/role";

interface ConstructorAuthRepository {
  new (
    user: UserType,
    token: TokenType,
    role: RoleType
  ): InterfaceAuthRepository;
}

export interface InterfaceAuthRepository {
  registrationUser(userInfo: TypeUserInfo): Promise<UserModel>;
  authenticationUser(userInfo: TypeUserInfo): Promise<UserModel>;
  generateTokens(userId: string): Promise<TypePairOfToken>;
  refreshToken(token: string): Promise<string>;
  logout(userId: string): Promise<number>;
}

type TypeUserInfo = {
  user_name: string;
  user_password: string;
} & { user_name: string; user_email: string };

type TypePairOfToken = {
  access_token: string;
  refresh_token: string;
};

export function createAuthRepository(
  repo: ConstructorAuthRepository,
  user: UserType,
  token: TokenType,
  role: RoleType
): InterfaceAuthRepository {
  return new repo(user, token, role);
}

// TODO: теория по разделению

export class AuthRepository implements InterfaceAuthRepository {
  userModel: UserType;
  tokenModel: TokenType;
  roleModel: RoleType;

  constructor(user: UserType, token: TokenType, role: RoleType) {
    this.userModel = user;
    this.tokenModel = token;
    this.roleModel = role;
  }

  async registrationUser(userInfo: TypeUserInfo) {
    try {
      const { user_name, user_email } = userInfo;
      const user = await this.userModel.findOne({
        where: {
          user_name: user_name,
          user_email: user_email,
        },
      });
      if (user) {
        throw new ServerError("Auth", "User already registred");
      }
      const newUser = await this.userModel.create({
        ...userInfo,
      });
      return newUser;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }

  async authenticationUser(userInfo: TypeUserInfo) {
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
      let { name, message } = error as Error;
      throw new ServerError(name, message);
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
      let { name, message } = error as Error;
      throw new ServerError(name, message);
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
        throw new ServerError("Auth", "Token is invalid");
      }
      await this.tokenModel.destroy({
        where: {
          refresh_token: token,
        },
      });
      return tokenInDB.user_id;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
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
        throw new ServerError("Auth", "Token is invalid");
      }
      const result = await this.tokenModel.destroy({
        where: {
          user_id: userId,
        },
      });
      return result;
    } catch (error: unknown) {
      let { name, message } = error as Error;
      throw new ServerError(name, message);
    }
  }
}

/* const u = createRepository<InterfaceAuthRepository>(AuthRepository);
u.logout('dfdf') */
// const i = createAuthRepository(AuthRepository)
// export default AuthRepository;
