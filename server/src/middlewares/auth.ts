import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { responseError } from "../helpers/responses";
// hack
interface IUser extends Request {
  user?: any;
}

export const verifyToken = (req: IUser, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return responseError(res, 403, "Authentication is required");
  }
  try {
    const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    req.user = decoded;
    return next();
  } catch (err) {
    return responseError(res, 401, "Invalid Token");
  }
};

export const checkRefreshCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies.refreshToken;
  if (cookie) {
    return responseError(res, 500, "You are already logined");
  } else {
    return next();
  }
};
