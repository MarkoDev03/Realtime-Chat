import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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