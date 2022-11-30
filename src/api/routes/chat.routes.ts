import { Router } from "express";
import { createChat, getChatParticipants, getMyChats, joinChat, leaveChat } from "../controllers/chat.controller";
import { verifyJWT } from "../middleware/handlers/verify-jwt";

const router = Router();

router.route("/get-chat-participants").get(verifyJWT, getChatParticipants);
router.route("/get-my-chats-list").get(verifyJWT, getMyChats);

router.route("/create-chat").post(verifyJWT, createChat);

router.route("/join-chat").put(verifyJWT, joinChat);
router.route("/leave-chat").put(verifyJWT, leaveChat);

export default router;