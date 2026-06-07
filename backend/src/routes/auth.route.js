import { Router } from "express";
import { registerUser, verifyUser } from "../controllers/auth.controller.js";

const router = Router()


router.route("/register").post(registerUser)
router.route("/verify-email/:token").post(verifyUser)

export default router