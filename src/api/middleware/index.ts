import { Router } from "express";
import auth from "../routes/auth.routes";
import chat from "../routes/chat.routes";

const router = Router();

router.use("/authentication", auth);
router.use("/chats", chat);

export default router;