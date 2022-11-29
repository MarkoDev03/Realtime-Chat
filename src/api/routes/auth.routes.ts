import { Router } from "express";
import { changePassword, deleteAccount, getAccountDetails, signIn, signUp } from "../controllers/auth.controller";
import { verifyJWT } from "../middleware/handlers/verify-jwt";

const router = Router();

router.route("/get-account-details").get(verifyJWT, getAccountDetails);

router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);

router.route("/change-password").put(verifyJWT, changePassword);

router.route("/delete-account").delete(verifyJWT, deleteAccount);

export default router;