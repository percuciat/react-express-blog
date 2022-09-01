import { BaseError } from "sequelize";

/* 
TODO: delete in master
function convert(message) {
  let textMsg = "";
  if (typeof message === "object") {
    try {
      textMsg += JSON.stringify(message);
    } catch (e) {
      textMsg += "recursive link in message";
    }
  } else {
    textMsg += message;
  }
  return textMsg;
} */

export class NotFoundError extends BaseError {
  status: number;
  expose: boolean;
  constructor(message) {
    super(message);
    this.status = 404;
    this.expose = true;
  }
}

export class ServerError extends BaseError {
  status: number;
  expose: boolean;
  constructor(message) {
    const textMsg = message;
    super(textMsg);
    this.status = 500;
    this.expose = true;
  }
}

export class DataBaseError extends BaseError {
  status: number;
  expose: boolean;
  constructor(message) {
    const textMsgs = message;
    super(textMsgs);
    this.status = 500;
    this.expose = true;
  }
}

export class ClientError extends BaseError {
  status: number;
  expose: boolean;
  constructor(status, message) {
    super(message);
    this.status = status;
    this.expose = true;
  }
}
