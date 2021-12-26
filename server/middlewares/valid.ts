import {Request, Response, NextFunction} from "express";

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body

    if(!name) {
        return res.status(400).json({msg: "Please add your name."})
    } else if (name.length > 20 ) {
        return res.status(400).json({msg: "Your name is up to 20 char."})
    }

    if(!account) {
        return res.status(400).json({msg: "Please add your email or phone number."})
    } else if (!validateEmail(account)) {
        return res.status(400).json({msg: "Your email format is incorrect."})
    }

    if(password.length < 6) {
        return res.status(400).json({msg: "Password must be at least 6 chars."})
    }

    next();
};

function validPhone(phone: string) {
    const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    return phoneRe.test(phone);
}

function validateEmail (email: string) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRe.test(email)
};