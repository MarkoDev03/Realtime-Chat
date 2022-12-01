import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeSent: {
    type: Date,
    default: () => new Date()
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;