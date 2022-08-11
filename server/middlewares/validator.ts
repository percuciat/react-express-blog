import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

export const validatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const errors = validationResult(req).formatWith(({ msg, param, value }) => ({
    message: msg,
    param,
    value,
  }));
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "Error", errorData: errors.array() });
  } else {
    next();
  }
};
