import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class APIError extends CustomError {
  constructor(public message: string, status: number) {
    super(message);

    if (status) {
      this.status = status;
    } 

    if (!status) {
      this.status = StatusCodes.BAD_REQUEST;
    }

    this.name = "ApiError";

    Object.setPrototypeOf(this, APIError.prototype);
  }
}