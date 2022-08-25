import { Request, Response } from "express";
import { responseSuccess, responseError } from "../helpers/responses";
import AuthService from "../services/auth";
import AuthRepository from "../repository/auth";
import { cookieManager } from "../helpers/cookie";
import { refreshTokenTime } from "../helpers/tokens";

const CLIENT_URL = `${process.env.BASE_URL}`;
const service = new AuthService(AuthRepository);
const authController = {
  async registration(req: Request, res: Response) {
    try {
      const userInfo = req.body;
      await service.registration(userInfo);
      return responseSuccess(res, {
        info: "Registration has successfully completed!",
      });
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },
  async login(req: Request, res: Response) {
    try {
      const userInfo = req.body;
      const cookie = cookieManager(res);
      const { access_token, refresh_token } = await service.login(userInfo);
      cookie.set("refreshToken", refresh_token, refreshTokenTime);
      return responseSuccess(res, {
        info: "Authorization has successfully completed!",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async refreshToken(req: Request, res: Response) {
    try {
      const token = req.body;
      const cookie = cookieManager(res);
      const { access_token, refresh_token } = await service.refresh(
        token.refresh_token
      );
      cookie.destroy("refreshToken");
      cookie.set("refreshToken", refresh_token, refreshTokenTime);
      return responseSuccess(res, {
        info: "New pair of tokens has successfully generated!",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const cookie = cookieManager(res);
      await service.logout(user_id);
      cookie.destroy("refreshToken");
      return responseSuccess(res, {
        info: "Success!",
        success: true,
      });
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },
};

export default authController;
