import { Request, Response } from "express";
import { responseSuccess, responseError } from "../helpers/responses";
import AuthService from "../services/auth";
import AuthRepository from "../repository/auth";

const CLIENT_URL = `${process.env.BASE_URL}`;
const service = new AuthService(AuthRepository);
const authController = {
  async registration(req: Request, res: Response) {
    try {
      const userInfo = req.body;
      await service.registration(userInfo);
      return responseSuccess(res, "Registration has successfully completed!");
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },
  async login(req: Request, res: Response) {
    try {
      const userInfo = req.body;
      const { access_token, refresh_token } = await service.login(userInfo);
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
      const { access_token, refresh_token } = await service.refresh(
        token.refresh_token
      );
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
      await service.logout(user_id);
      return responseSuccess(res, {
        info: "Success!",
        success: true,
      });
    } catch (error: any) {
      return responseError(res, error.status, error.message);
    }
  },
};

/*const url = `${CLIENT_URL}/active/${activeToken}`;

            sendEmail(account, url, 'Verify your email address.');

            return res.json({
                msg: 'Success! Check yor email address for completing registration!'
            })*/
/*return res.json({
                status: 'OK',
                msg: 'Register successfully!',
                data: newUser,
                activeToken
            })*/
/* } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    const { account, password } = req.body;
    try {*/
/*const userInDB = await userSchemaModel.findOne({account});
            if (userInDB && (await bcrypt.compare(password, userInDB.password))) {
                const newUser = {
                    account: userInDB.account.toLowerCase(),
                    password: userInDB.password
                };

                const activeToken = generateActiveToken({newUser})

                return res.json({
                    status: 'OK',
                    msg: 'Login successfully!',
                    data: newUser,
                    activeToken
                });
            }
            res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
     Our register logic ends here
  },
};*/

export default authController;
