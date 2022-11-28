import { CustomError } from "./custom-error";
import { StatusCodes } from "http-status-codes";
import { Constants } from "../../common/constants";

export class NotFound extends CustomError {
  constructor() {
    super(Constants.NOT_FOUND);

    this.status = StatusCodes.NOT_FOUND;
    this.name = "NotFound";

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export class NotAllowed extends CustomError {
  constructor() {
    super(Constants.BLOCKED_BY_CORS_POLICY);

    this.status = StatusCodes.METHOD_NOT_ALLOWED;
    this.name = "NotAllowed";

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}