import {
  BadRequestError,
  ServerError,
  AuthenticationError,
} from "../helpers/errors";
import { generateActiveToken } from "../helpers/generateToken";
import bcrypt from "bcrypt";

import { compareSync } from "bcrypt";


/* 

user_name": "Oleg",
    "user_email": "ahsdhau@dfdf.ru",
    "user_password": "12345",
    "password_confirm": "12345"

    user_name": "Mitya",
    "user_email": "agoo@dfdf.ru",
    "user_password": "22222",
    "password_confirm": "22222"
*/

class AuthService {
  authRepo: any;
  constructor(authRepo) {
    this.authRepo = authRepo;
  }

  async registration(userInfo) {
    try {
      const res = await this.authRepo.registrationUser(userInfo);
      //const userWithToken = generateActiveToken(res.user_name);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  async login(userInfo) {
    try {
     // const { user_name, user_password } = userInfo;
      const userInDB = await this.authRepo.loginUser(userInfo);
      
      /* const userWithToken = generateActiveToken(res.user_name);
      return { token: `Bearer ${userWithToken}` }; */
      return userInDB;
    } catch (error: any) {
      throw error;
    }
  }
}

export default AuthService;
