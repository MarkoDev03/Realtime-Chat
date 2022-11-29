import { StatusCodes } from "http-status-codes";
import { APIError } from "../errors/api-error";
import Chat from "../models/schemas/chat";

export class ChatService {
  public static async isInChat(userId: string, chatId: string): Promise<boolean> {
    try {
      const chat = await Chat.findOne({ chatId: chatId });

      let filteredParticipants = chat.participants.filter((x) => x === userId);

      if (filteredParticipants.length !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      throw new APIError(error?.message, StatusCodes.BAD_REQUEST);
    }
  }
}