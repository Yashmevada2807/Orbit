import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addMember, addTask } from "../controllers/project.controller.js";

const router = Router()

router.route("/:projectId/tasks").post(verifyJWT, addTask)
router.route("/:projectId/members").post(verifyJWT, addMember)

export default router