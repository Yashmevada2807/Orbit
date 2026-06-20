import { WorkSpace } from "../models/workspace.model.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"


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


export { createWorkspace, getProjects, getWorkspace, getWorkspaceById, updateWorkspace }