import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
import { Constants } from "../../common/constants";

export class DBConnectionError extends CustomError {
  constructor() {
    super(Constants.DB_CONNECTION_FAILED);

    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = "DBConnectionError";

    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }
}