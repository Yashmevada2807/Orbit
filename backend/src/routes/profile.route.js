import { Router } from "express";
import { createProfile } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/profile").post(verifyJWT, upload.single("avatar"), createProfile)


export default router