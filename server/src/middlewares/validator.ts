import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { responseError } from "../helpers/responses";

export function validatorMiddleware(schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schema.map((el) => el.run(req)));
    const errors = validationResult(req).formatWith(
      ({ msg, param, value }) => ({
        message: msg,
        param,
        value,
      })
    );
    if (errors.isEmpty()) {
      return next();
    } else {
      return responseError(res, 400, errors.array());
    }
  };
}