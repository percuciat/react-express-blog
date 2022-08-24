import { BaseError } from "sequelize";

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
}

export class NotFoundError extends BaseError {
  constructor(message) {
    const textMsg = `${convert(message)}`;
    super(textMsg);
    this.status = 404;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class ServerError extends BaseError {
  constructor(message) {
    const textMsg = `${convert(message)}`;
    super(textMsg);
    this.status = 500;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class DataBaseError extends BaseError {
  constructor(message) {
    const textMsgs = `${convert(message)}`;
    super(textMsgs);
    this.status = 500;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class AuthenticationError extends BaseError {
  constructor(message) {
    const textMsg = `${convert(message)}`;
    super(textMsg);
    this.status = 403;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class AuthorizationError extends BaseError {
  constructor(message) {
    const textMsg = `${convert(message)}`;
    super(textMsg);
    this.status = 401;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class BadRequestError extends BaseError {
  constructor(message) {
    const textMsg = `BadRequestError\n${convert(message)}`;
    super(textMsg);
    this.status = 400;
  }
  status: number;
}
