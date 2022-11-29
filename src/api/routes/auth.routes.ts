import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const router = Router();

router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);

export default router;