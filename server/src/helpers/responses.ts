import { Response } from "express";

/* interface IResponse {
  getResponse() => 
} */

export function responseSuccess(res: Response, message: any) {
  return res.status(200).json({
    data: message,
    error: null,
  });
}

export function responseError(res: Response, status: number, message: any) {
  return res.status(status).json({
    data: null,
    error: message,
  });
}
