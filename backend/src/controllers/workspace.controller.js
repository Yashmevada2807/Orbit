import { Project } from "../models/project.model.js"
import { WorkSpace } from "../models/workspace.model.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ProjectEnum } from "../utils/project.enum.js"


const createWorkspace = asyncHandler(async (req, res) => {

    const { name, description } = req.body

    const workspace = await WorkSpace.findOne({ name })
    if (workspace) throw new ApiError(400, "Workspace already exist")
    const user = req.user

    const newWorkspace = await WorkSpace.create({
        name,
        description,
        owner: user._id
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newWorkspace,
                "workspace created succesfully"
            )
        )
})

const getWorkspace = asyncHandler(async (req, res) => {
    const workspace = await WorkSpace.find()

    if (!workspace) throw new ApiError(404, "Workspace does not exist")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                workspace,
                "workspaces fetched successfully"
            )
        )
})

const getWorkspaceById = asyncHandler(async (req, res) => {

    const { workspaceId } = req.params

    const workspace = await WorkSpace.findById(workspaceId)

    if (!workspace) throw new ApiError(404, "Workspace does not exist")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                workspace,
                "Workspace fetched successfully"
            )
        )

})

const updateWorkspace = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    const { workspaceId } = req.params

    const updatedWorkspace = await WorkSpace.findById(workspaceId)

    updatedWorkspace.name = name
    updatedWorkspace.description = description

    await updatedWorkspace.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedWorkspace,
                "Workspace updated successfully"
            )
        )

})

const getProjects = asyncHandler(async (req, res) => {

    const { workspaceId } = req.params

    const projects = await WorkSpace.findById(workspaceId).populate({ path: "projects", select: "-members -tasks -description -enddate" })

    if (!projects) throw new ApiError(404, "project does not exist")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                projects.projects
            )
        )
})

const getProjectById = asyncHandler(async (req, res) => {

    const { workspaceId, projectId } = req.params

    if (!workspaceId) throw new ApiError(404, "invalid workspaceId")

    const project = await Project.findById(projectId)

    if (!project) throw new ApiError(404, "Invalid projectId or project does not exist")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                project,
                "project fetched successfully"
            )
        )

})

const updateProject = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    const { workspaceId, projectId } = req.params

    if (!workspaceId) throw new ApiError(404, "invalid workspaceId")

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            $set: {
                ...(name && { name }),
                ...(description && { description })
            }
        },
        {
            new: true,
            runValidators: true
        }

    )

    if (!project) throw new ApiError(404, "invalid projectId or project does not exist")


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                project,
                "project Update successfully"
            )
        )

})

// Delete Workspace
// DELETE /workspaces/:workspaceId

// Delete Project
// DELETE /workspaces/:workspaceId/projects/:projectId

// Workspace Members
// Add Member to Workspace
// POST /workspaces/:workspaceId/members

// Get Workspace Members
// GET /workspaces/:workspaceId/members

// Update Member Role
// PATCH /workspaces/:workspaceId/members/:memberId

// Remove Member
// DELETE /workspaces/:workspaceId/members/:memberId

export { createWorkspace, getProjects, getWorkspace, getWorkspaceById, updateWorkspace, getProjectById, updateProject }