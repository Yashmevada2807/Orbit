import { Router } from "express";
import { createWorkspace } from "../controllers/workspace.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProject } from "../controllers/project.controller.js";


const router = Router()


router.route("/").post(verifyJWT, createWorkspace)
router.route("/:workspaceId/projects").post(verifyJWT, createProject)

export default router