import express, { json } from "express";
import authController from "../controllers/auth";
import { validatorMiddleware } from "../middlewares/validator";
import {
  checkRegistration,
  checkLogin,
} from "../helpers/schemas/authValidation";
const router = express.Router();

router.post("/login", validatorMiddleware(checkLogin), authController.login);

router.post(
  "/registration",
  validatorMiddleware(checkRegistration),
  authController.registration
);

/*router.post('/welcome', verifyToken, (req, res, ) => {
    res.status(200).send("Welcome 🙌 ");
});*/
export default router;
