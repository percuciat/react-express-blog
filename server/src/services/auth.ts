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

import { User } from "../models/user";
import { Token } from "../models/token";
import { Role } from "../models/role";
import {
  createAuthRepository,
  AuthRepository,
  InterfaceAuthRepository,
} from "../repository/auth";

class AuthService {
  authRepo: InterfaceAuthRepository;
  constructor() {
    this.authRepo = createAuthRepository(AuthRepository, User, Token, Role);
  }

  async registration(userInfo) {
    try {
      await this.authRepo.registrationUser(userInfo);
    } catch (error: any) {
      throw error;
    }
  }

  async login(userInfo) {
    try {
      const user = await this.authRepo.authenticationUser(userInfo);
      const pairOfTokens = await this.authRepo.generateTokens(user.id);
      return pairOfTokens;
    } catch (error: any) {
      throw error;
    }
  }

  async refresh(token: string) {
    try {
      const userId = (await this.authRepo.refreshToken(token)) as string;
      const pairOfTokens = await this.authRepo.generateTokens(userId);
      return pairOfTokens;
    } catch (error: any) {
      throw error;
    }
  }

  async logout(userId: string) {
    try {
      const res = await this.authRepo.logout(userId);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
}

export default AuthService;
