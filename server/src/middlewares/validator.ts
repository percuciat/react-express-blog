import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { responseError } from "../helpers/responses";

export async function validation(schema, req, res, next) {
  req["express-validator#contexts"] = schema;
  next();
}

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
    return responseError(res, 400, errors.array());
  } else {
    next();
  }
};
