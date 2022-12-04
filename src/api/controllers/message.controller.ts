import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { Constants } from "../../common/constants";
import { APIError } from "../errors/api-error";
import { BadRequest } from "../errors/server-errors";
import Chat from "../models/schemas/chat";
import Message from "../models/schemas/message";
import { AuthService } from "../services/auth.service";

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    const user = await AuthService.getUserByToken(token);

    const { chatId, message } = req.body;

    const msgObj = { chatId: chatId, userId: user.userId, username: user.username, messageId: v4(), text: message };

    const messageModel = await Message.create(msgObj);
    await messageModel.save();

    res.status(200).json(msgObj);
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}

export const getAllMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const token = req.headers.authorization;
    const user = await AuthService.getUserByToken(token);

    if (!req.query.chatId) {
      throw new BadRequest(Constants.ALL_FIELDS_ARE_REQUIRED);
    }

    const chat = await Chat.findOne({ chatId: req.query.chatId });

    if (!chat) {
      throw new BadRequest(Constants.CHAT_DOESNT_EXIST);
    }

    const chatWithAdmin = await Chat.findOne({ userId: user.userId, chatId: req.query.chatId });

    if (!chatWithAdmin) {
      throw new BadRequest(Constants.CHAT_DOESNT_EXIST);
    }

    const isParticipant = await Chat.findOne({ chatId: req.query.chatId });
    const participant = isParticipant.participants.find(x => x === user.userId);

    if (!participant) {
      throw new BadRequest(Constants.CHAT_DOESNT_EXIST);
    }

    const messages = await Message.find({ chatId: req.query.chatId });
    res.status(200).json(messages);
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}