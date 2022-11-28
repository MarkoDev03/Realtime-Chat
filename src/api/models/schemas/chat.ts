import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  chatId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
  }
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;