import { Request, Response, NextFunction } from "express";
import { Constants } from "../../../common/constants";
import { CustomError } from "../../errors/custom-error";
import { StatusCodes } from "http-status-codes";
import { Logger } from "../../../config/logger";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {

  Logger.error(error.message, error.stack);

  if (error instanceof CustomError) {
    res.status(error.status).json({
      errors: error.serializeError()
    });

    return next();
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: Constants.INTERNAL_SERVER_ERROR
    }]
  });

  return next();
}