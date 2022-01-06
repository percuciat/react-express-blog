import express from 'express';
import authC from '../controllers/authC';
import {validRegister, validLogin} from '../middlewares/valid'
import {verifyToken} from '../middlewares/auth'

const router = express.Router();

router.post('/register', validRegister, authC.register);
router.post('/login', validLogin, authC.login);

router.post('/welcome', verifyToken, (req, res, ) => {
    res.status(200).send("Welcome 🙌 ");
});
export default router;