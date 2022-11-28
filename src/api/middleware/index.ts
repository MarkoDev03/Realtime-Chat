import { Router } from "express";
import startRoutes from "../routes/chat.routes";

const router = Router();

router.use("/socket", startRoutes);

export default router;