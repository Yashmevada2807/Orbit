import { Router } from "express";
import { createWorkspace, getProjectById, getProjects, getWorkspace, getWorkspaceById, updateProject, updateWorkspace } from "../controllers/workspace.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProject } from "../controllers/project.controller.js";


const router = Router()


router.route("/").post(verifyJWT, createWorkspace)
router.route("/").get(verifyJWT, getWorkspace)
router.route("/:workspaceId").get(verifyJWT, getWorkspaceById)
router.route("/:workspaceId").put(verifyJWT, updateWorkspace)
router.route("/:workspaceId/projects").post(verifyJWT, createProject)
router.route("/:workspaceId/projects").get(verifyJWT, getProjects)
router.route("/:workspaceId/projects/:projectId").get(verifyJWT, getProjectById)
router.route("/:workspaceId/projects/:projectId").patch(verifyJWT, updateProject)

export default router