import { Project } from "../models/project.model.js"
import { WorkSpace } from "../models/workspace.model.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ProjectStatus } from "../utils/project.enum.js"

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const { workspaceId } = req.params

    if (!workspaceId) throw new ApiError(400, "workspace Id required");

    const workspace = await WorkSpace.findById(workspaceId)

    if (!workspace) throw new ApiError(400, "workspace not exist")

    const newProject = await Project.create({
        workspaceid: workspaceId,
        name,
        description,
        status: ProjectStatus.inprogress
    })

    // workspace.projects = JSON.parse(newProject._id)
    workspace.projects.push(newProject._id);

    await workspace.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newProject,
                "project created succesfullly"
            )
        )
})

export { createProject }