import express, { json } from "express";
/* import authController from '../controllers/authController'; */
const router = express.Router();

/* router.post('/register', validRegister, authController.register); */

router.get("/auth/signup", async function (r, res) {
  return res.json({ key: "value" });
});

/*router.post('/welcome', verifyToken, (req, res, ) => {
    res.status(200).send("Welcome 🙌 ");
});*/
export default router;
