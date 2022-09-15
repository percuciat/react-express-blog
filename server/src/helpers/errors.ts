import { BaseError } from "sequelize";

class ApiError extends BaseError {
  name: string;
  expose: boolean;
  constructor(name: string, message) {
    super(message);
    this.expose = true;
    this.name = name;
  }
}

export class NotFoundError extends ApiError {
  status: number;
  constructor(name: string, message) {
    super(name, message);
    this.status = 404;
  }
}

export class ServerError extends ApiError {
  status: number;
  constructor(name, message) {
    super(name, message);
    this.status = 500;
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
