import {
  BadRequestError,
  ServerError,
  AuthenticationError,
} from "../helpers/errors";

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

  async refresh(token) {
    try {
      const userId = await this.authRepo.refreshToken(token);
      const pairOfTokens = await this.authRepo.generateTokens(userId);
      return pairOfTokens;
    } catch (error: any) {
      throw error;
    }
  }

  async logout(userId) {
    try {
      const result = await this.authRepo.logout(userId);
      /* const userId = await this.authRepo.refreshToken(token);
      const pairOfTokens = await this.authRepo.generateTokens(userId);
      return pairOfTokens; */
    } catch (error: any) {
      throw error;
    }
  }
}

export default AuthService;
