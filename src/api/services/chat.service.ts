import { StatusCodes } from "http-status-codes";
import { APIError } from "../errors/api-error";
import Chat from "../models/schemas/chat";

export class ChatService {
  public static async isInChat(userId: string, chatId: string): Promise<boolean> {
    try {
      const chat = await Chat.findOne({ userId: userId, chatId: chatId });

      if (chat) {
        return true;
      }

      return false;
    } catch (error) {
      throw new APIError(error?.message, StatusCodes.BAD_REQUEST);
    }
  }
}