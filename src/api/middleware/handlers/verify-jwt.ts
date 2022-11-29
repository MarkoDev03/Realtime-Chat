import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Enviroment } from "../../../config/enviroment-vars";
import { APIError } from "../../errors/api-error";
import { UnAuthorized } from "../../errors/server-errors";
import User from "../../models/schemas/user";

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnAuthorized();
    }

    const bearer = token?.split(' ')[1];

    jwt.verify(bearer, Enviroment.JWT_SECRET_KEY, (err: any, data: any) => {
      if (err) {
        throw new UnAuthorized();
      }

      User.findOne({ userId: data?.userId })
        .then(() => next())
        .catch(() => { throw new UnAuthorized() });

    });
  } catch (error) {
    next(new APIError(error?.message, StatusCodes.BAD_REQUEST));
  }
}