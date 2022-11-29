import { Router } from "express";
import auth from "../routes/auth.routes";

const router = Router();

router.use("/authentication", auth);

export default router;