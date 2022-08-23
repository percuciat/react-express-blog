import { BadRequestError, ServerError, LogicError } from "../helpers/errors";
import { generateActiveToken } from "../helpers/generateToken";
import bcrypt from "bcrypt";

type TMethods<T> = {
  (...args: Array<T>): Promise<any>;
};

interface IpostService {
  client: any;
  models: any;
  /* create: TMethods<string>;
  update: TMethods<string>;
  delete: TMethods<string>;
  posts: TMethods<{ [key: string]: any }>; */
}

import AuthRepository from "../repository/auth";

class AuthService {
  constructor() {}

  async register(userInfo) {
    try {
      const res = await AuthRepository.register(userInfo);
      const userWithToken = generateActiveToken(res.user_name);
      return userWithToken;
    } catch (error: any) {
      throw error;
    }
  }

  async login(userInfo) {
    try {
      const res = await AuthRepository.login(userInfo);
      const isMatch = await bcrypt.compare(res.password, userInfo.password);
      if (!isMatch) {
        throw new LogicError(`${"Password is incorrect"}`);
      }
      const userWithToken = generateActiveToken(res.user_name);
      return { token: `Bearer ${userWithToken}` };
    } catch (error: any) {
      throw error;
    }
  }
}

export default new AuthService();
