import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {generateAccessToken, generateActiveToken, generateRefreshToken} from '../config/generateToken'
import {model} from 'mongoose';
import userModel from '../models/userModel';


const CLIENT_URL = `${process.env.BASE_URL}`


const Users = model('User', userModel);
const authController = {
    register: async (req: Request, res: Response) => {

        try {
            /*const userInDB = await userSchemaModel.findOne({account})
            if (userInDB) res.status(400).json({msg: 'Email or Phone already exists'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = await userSchemaModel.create({
                name, account, password: passwordHash
            });
            const activeToken = generateActiveToken({newUser});

            return res.json({
                status: 'OK',
                msg: 'Register successfully!',
                data: newUser,
                activeToken
            })*/
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

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req: Request, res: Response) => {
        const {account, password} = req.body;
        try {
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
            res.status(400).send("Invalid Credentials");*/
        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here
    }
};

export default authController