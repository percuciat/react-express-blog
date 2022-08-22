const MYSQL_ERRORS = {
  ER_DUP_ENTRY: "ER_DUP_ENTRY",
};

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

export class NotFoundError extends Error {
  constructor(message) {
    const textMsg = `Not Found\n${convert(message)}`;
    super(textMsg);
    this.status = 404;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class ServerError extends Error {
  constructor(message) {
    const textMsg = `${convert(message)}`;
    super(textMsg);
    this.status = 500;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

class LogicError extends Error {
  constructor(message) {
    const textMsg = `LogicError\n${convert(message)}`;
    super(textMsg);
    this.status = 400;
    this.expose = true;
  }
  status: number;
  expose: boolean;
}

export class BadRequestError extends Error {
  constructor(message) {
    const textMsg = `BadRequestError\n${convert(message)}`;
    super(textMsg);
    this.status = 400;
  }
  status: number;
}
