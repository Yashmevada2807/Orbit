import { Router } from "express";
import { createProfile, getCurrentUserProfile, getUserProfile, updateProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/").post(verifyJWT, upload.single("avatar"), createProfile)
router.route("/").patch(verifyJWT, updateProfile)
router.route("/").get(verifyJWT, getCurrentUserProfile)
router.route("/:username").get(verifyJWT, getUserProfile)


export default router