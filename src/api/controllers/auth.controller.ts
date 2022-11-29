import { Request, Response, NextFunction } from "express";
import { APIError } from "../errors/api-error";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { Enviroment } from "../../config/enviroment-vars";
import User from "../models/schemas/user";
import { AuthService } from "../services/auth.service";
import { Constants } from "../../common/constants";
import { StatusCodes } from "http-status-codes";

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;

    AuthService.validateParams(username, password);
    await AuthService.userExits(username);

    const salt = bcrypt.genSaltSync(Enviroment.SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      userId: v4(),
      username,
      password: hashedPassword
    };

    const userModel = await User.create(newUser);
    await userModel.save();

    const response = AuthService.getResponse(newUser.userId, username);

    res.status(200).json(response);
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;

    AuthService.validateParams(username, password);

    const user = await User.findOne({ username }).select({ userId: 1, username: 1, password: 1 });

    if (!user) {
      throw new APIError(Constants.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    AuthService.validatePassword(password, user.password);

    const response = AuthService.getResponse(user.userId, username);

    res.status(200).json(response);
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}