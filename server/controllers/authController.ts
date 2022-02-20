import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {generateAccessToken, generateActiveToken, generateRefreshToken} from '../config/generateToken'
import {model} from 'mongoose';
import userModel from '../models/userModel';


const Users = model('User', userModel);
const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const {name, account, password} = req.body
            const user = await Users.findOne({account})
            if (user) res.status(400).json({msg: 'Email or Phone already exists'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, account, password: passwordHash
            };

            const activeToken = generateActiveToken({newUser})

            res.json({
                status: 'OK',
                msg: 'Register successfully!',
                data: newUser,
                activeToken
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};

export default authController