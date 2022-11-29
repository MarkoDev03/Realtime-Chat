import { Request, Response, NextFunction } from "express";
import { APIError } from "../errors/api-error";
import { v4 } from "uuid";
import { AuthService } from "../services/auth.service";
import { BadRequest } from "../errors/server-errors";
import Chat from "../models/schemas/chat";
import { Constants } from "../../common/constants";
import { ChatService } from "../services/chat.service";
import { StatusCodes } from "http-status-codes";

export const createChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    const user = await AuthService.getUserByToken(token);

    const { name } = req.body;

    if (!name) {
      throw new BadRequest(Constants.ALL_FIELDS_ARE_REQUIRED);
    }

    const chat = {
      chatId: v4(),
      userId: user.userId,
      name
    };

    const chatModel = new Chat(chat);
    await chatModel.save();

    res.status(200).json(chat);
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}

export const joinChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    const user = await AuthService.getUserByToken(token);

    const { chatId } = req.query;

    if (!chatId) {
      throw new BadRequest(Constants.ALL_FIELDS_ARE_REQUIRED);
    }

    const isInChat = await ChatService.isInChat(user.userId, chatId.toString());

    if (isInChat) {
      throw new BadRequest(Constants.ALREADY_IN_CHAT);
    }

    const chat = await Chat.findOne({ chatId: chatId });

    if (!chat) {
      throw new APIError(Constants.CHAT_DOESNT_EXIST, StatusCodes.NOT_FOUND)
    }

    const participants = chat.participants;
    participants.push(user.userId);

    await Chat.findByIdAndUpdate(chat._id, { participants: participants });

    res.status(200).json({ message: Constants.CHAT_JOINED_SUCCESSFULLY });
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}