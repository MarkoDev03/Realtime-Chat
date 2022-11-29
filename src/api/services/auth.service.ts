import jwt from "jsonwebtoken";
import { Constants } from "../../common/constants";
import { Enviroment } from "../../config/enviroment-vars";
import { DateFormats } from "../../utils/date-formats";
import { BadRequest } from "../errors/server-errors";
import { Tokens } from "../models/classes/tokens";
import bcrypt from "bcrypt";
import { UserResponse } from "../models/classes/user-response";
import User from "../models/schemas/user";
import { APIError } from "../errors/api-error";
import { StatusCodes } from "http-status-codes";

export class AuthService {
  public static getAccessToken(userId: string, username: string) {

    const payload = {
      userId,
      username,
      signInTime: DateFormats.currentDateLogFormat(),
      expiresIn: Enviroment.JWT_SESSION_LIFE
    };

    const accessToken = jwt.sign(payload, Enviroment.JWT_SECRET_KEY, { expiresIn: Enviroment.JWT_SESSION_LIFE.toString() });
    return accessToken;
  }

  public static getRefreshToken(userId: string) {

    const payload = { userId };

    const refreshToken = jwt.sign(payload, Enviroment.JWT_SECRET_KEY, { expiresIn: Enviroment.JWT_REFRESH_TOKEN_SESSION_LIFE });
    return refreshToken;
  }

  public static generateTokens(userId: string, username: string): object {
    const accessToken = AuthService.getAccessToken(userId, username);
    const refreshToken = AuthService.getRefreshToken(userId);

    const tokens = new Tokens(accessToken, refreshToken);

    return tokens.getTokens();
  }

  public static validateParams(username: any, password: any) {
    if (!username || !password) {
      throw new BadRequest(Constants.ALL_FIELDS_ARE_REQUIRED);
    }
  }

  public static validatePassword(password: string, hashedPassword: string) {
    const passwordMatch = bcrypt.compareSync(password, hashedPassword);

    if (!passwordMatch) {
      throw new BadRequest(Constants.WRONG_PASSWORD);
    }

    return true;
  }

  public static getResponse(userId: string, username: string) {
    const tokens = AuthService.generateTokens(userId, username);
    const user = new UserResponse(userId, username);

    return { tokens, user: user.getUser() }
  }

  public static async userExits(username: string) {
    const user = await User.findOne({ username }).select({ userId: 1, username: 1, password: 1 });

    if (user) {
      throw new APIError(Constants.USERNAME_IS_TAKEN, StatusCodes.BAD_REQUEST);
    }
  }
}