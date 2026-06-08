import { Router } from "express";
import { loginUser, registerUser, resendEmailVerificationLink, verifyUser } from "../controllers/auth.controller.js";

const router = Router()


router.route("/register").post(registerUser)
router.route("/verify-email/:token").get(verifyUser)
router.route("/login").post(loginUser)
router.route("/resend-email").post(resendEmailVerificationLink)
export default router