import { Request, Response, NextFunction } from "express";
import { APIError } from "../errors/api-error";
import { v4 } from "uuid";
import { AuthService } from "../services/auth.service";
import { BadRequest } from "../errors/server-errors";
import Chat from "../models/schemas/chat";
import { Constants } from "../../common/constants";
import { ChatService } from "../services/chat.service";
import { StatusCodes } from "http-status-codes";
import User from "../models/schemas/user";

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

    const { chatId } = req.body;

    if (!chatId) {
      throw new BadRequest(Constants.ALL_FIELDS_ARE_REQUIRED);
    }

    const chat = await Chat.findOne({ chatId: chatId });

    if (chat.userId === user.userId) {
      throw new BadRequest(Constants.ADMIN_CANT_JOIN_CHAT);
    }

    const isInChat = await ChatService.isInChat(user.userId, chatId.toString());

    if (isInChat) {
      throw new BadRequest(Constants.ALREADY_IN_CHAT);
    }

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

export const leaveChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;
    const user = await AuthService.getUserByToken(token);

    const { chatId } = req.body;

    if (!chatId) {
      throw new BadRequest(Constants.ALL_FIELDS_ARE_REQUIRED);
    }

    const chat = await Chat.findOne({ chatId: chatId });

    if (chat.userId === user.userId) {
      throw new BadRequest(Constants.ADMIN_CANT_JOIN_CHAT);
    }

    const isInChat = await ChatService.isInChat(user.userId, chatId.toString());

    if (!isInChat) {
      throw new BadRequest(Constants.YOU_ARE_NOT_IN_THIS_CHAT);
    }

    if (!chat) {
      throw new APIError(Constants.CHAT_DOESNT_EXIST, StatusCodes.NOT_FOUND)
    }

    const participants = chat.participants.filter((x) => x !== user.userId);

    await Chat.findByIdAndUpdate(chat._id, { participants: participants });

    res.status(200).json({ message: Constants.CHAT_LEFT_SUCCESSFULLY });
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}

export const getChatParticipants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { chatId } = req.query;

    const chat = await Chat.findOne({ chatId: chatId });

    if (!chat) {
      throw new APIError(Constants.CHAT_DOESNT_EXIST, StatusCodes.NOT_FOUND)
    }

    const participants = chat.participants;
    const participantsResult = [];

    if (chat.participants.length > 0) {
      let count = 0;

      while (count !== participants.length) {
        const participantId = participants[count];
        const participant = await User.findOne({ userId: participantId }).select({ username: 1, userId: 1, _id: 0 });

        if (participant) {
          participantsResult.push(participant);
        }

        count++;
      }
    }

    res.status(200).json(participantsResult);
  } catch (error) {
    next(new APIError(error?.message, error?.status));
  }
}