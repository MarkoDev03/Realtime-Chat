import { Router } from "express";
import { createChat, getChatParticipants, joinChat, leaveChat } from "../controllers/chat.controller";
import { verifyJWT } from "../middleware/handlers/verify-jwt";

const router = Router();

router.route("/get-chat-participants").get(verifyJWT, getChatParticipants);

router.route("/create-chat").post(verifyJWT, createChat);

router.route("/join-chat").put(verifyJWT, joinChat);
router.route("/leave-chat").put(verifyJWT, leaveChat);

export default router;