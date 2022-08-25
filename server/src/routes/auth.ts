import express from "express";
import authController from "../controllers/auth";
import { validatorMiddleware } from "../middlewares/validator";
import {
  checkRegistration,
  checkLogin,
  checkRefreshToken,
  checkLogout,
} from "../helpers/schemas/authValidation";
import { verifyToken, checkRefreshCookie } from "../middlewares/auth";
const router = express.Router();

router.post(
  "/login",
  validatorMiddleware(checkLogin),
  checkRefreshCookie,
  authController.login
);

router.post(
  "/registration",
  validatorMiddleware(checkRegistration),
  authController.registration
);

router.post(
  "/refresh",
  verifyToken,
  validatorMiddleware(checkRefreshToken),
  authController.refreshToken
);

router.post(
  "/logout",
  verifyToken,
  validatorMiddleware(checkLogout),
  authController.logout
);

/*router.post('/welcome', verifyToken, (req, res, ) => {
    res.status(200).send("Welcome 🙌 ");
});*/
export default router;
