import { Response } from "express";

export type TypeControllerError = {
  name: string;
  status: number;
  message: any;
};

export function responseSuccess(res: Response, message: any) {
  return res.status(200).json({
    data: message,
    error: null,
  });
}

export function responseError(res: Response, error: TypeControllerError) {
  const { status, name, message } = error;
  return res.status(status).json({
    data: null,
    error: {
      type: name,
      message: message,
      code: status,
    },
  });
}
