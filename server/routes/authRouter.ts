import express from 'express';
import authC from '../controllers/authC';
import { validRegister } from '../middlewares/valid'
const router = express.Router();

router.post('/register', validRegister, authC.register);

export default router;