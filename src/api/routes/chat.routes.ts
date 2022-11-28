import { Router } from "express";
import { getToken, live, logIn, sendMessage } from "../controllers/chat.controller";

const router = Router();

router.route("/messages/live/:roomId").get(live);
router.route("/join-room").post(logIn);
router.route("/create-room").get(getToken);
router.route("/send-message").post(sendMessage);

export default router;