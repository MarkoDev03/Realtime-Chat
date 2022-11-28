import { IErrorModel } from "../models/interfaces/error-model";

export abstract class CustomError extends Error {
  status?: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeError(): IErrorModel[] {
    return [{
      message: this.message,
      status: this.status,
      name: this.name
    }]
  }
}