import { Router } from "express";
import { addParticpant, createChat, deleteChat, getChatParticipants, getMyChats, joinChat, leaveChat, removeParticipant, renameChat } from "../controllers/chat.controller";
import { verifyJWT } from "../middleware/handlers/verify-jwt";

const router = Router();

router.route("/get-chat-participants").get(verifyJWT, getChatParticipants);
router.route("/get-my-chats-list").get(verifyJWT, getMyChats);

router.route("/create-chat").post(verifyJWT, createChat);

router.route("/join-chat").put(verifyJWT, joinChat);
router.route("/leave-chat").put(verifyJWT, leaveChat);
router.route("/remove-participant").put(verifyJWT, removeParticipant);
router.route("/add-participant").put(verifyJWT, addParticpant);
router.route("/change-chat-name").put(verifyJWT, renameChat);

router.route("/delete-chat").delete(verifyJWT, deleteChat);

export default router;