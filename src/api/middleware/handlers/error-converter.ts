import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../errors/custom-error";
import { StatusCodes } from "http-status-codes";
import { APIError } from "../../errors/api-error";
import { errorHandler } from "./error-handler";

export const errorConvertor = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (!(error instanceof CustomError)) {
    const exception = new APIError(error.message, StatusCodes.BAD_GATEWAY);

    exception.stack = error.stack;
    exception.name = error.name;

    return errorHandler(exception, req, res, next);
  }
}