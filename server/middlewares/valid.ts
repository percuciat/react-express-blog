import {Request, Response, NextFunction} from "express";
import validator from 'validator';


export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const {name, account, password} = req.body;
    const errors = [];

   /*  if (!name) {
        errors.push("Please add your name.");
    } else if (name.length > 20) {
        errors.push("Your name is up to 20 char.");
    }

    if (!account) {
        errors.push("Please add your email or phone number.");
    } else if (!validator.isEmail(account) && !validator.isMobilePhone(account)) {
        errors.push("Your email (test@yandex.ru) or phone (+723424224) format is incorrect.")
    }

    if (!password) {
        errors.push("Please add your password.");
    } else if (!validator.isLength(password, {min: 8, max: 16})) {
        errors.push("Password must be at least 8 chars and max 16 chars.");
    } */

    if (errors.length) {
        res.status(400).json({
            msg: errors
        })
    } else {
        next();
    }
};

export const validLogin = async (req: Request, res: Response, next: NextFunction) => {
    const {account, password} = req.body;
    const errors = [];

    /* if (!account) {
        errors.push("Please add your email or phone number.");
    } else if (!validator.isEmail(account) && !validator.isMobilePhone(account)) {
        errors.push("Your email (test@yandex.ru) or phone (+723424224) format is incorrect.")
    }

    if (!password) {
        errors.push("Please add your password.");
    } else if (!validator.isLength(password, {min: 8, max: 16})) {
        errors.push("Password must be at least 8 chars and max 16 chars.");
    }
 */
    if (errors.length) {
        res.status(400).json({
            msg: errors
        })
    } else {
        next();
    }
};

