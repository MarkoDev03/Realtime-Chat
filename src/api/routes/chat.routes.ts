import { Router } from "express";
import { createChat } from "../controllers/chat.controller";
import { verifyJWT } from "../middleware/handlers/verify-jwt";

const router = Router();

router.route("/create-chat").post(verifyJWT, createChat);

export default router;