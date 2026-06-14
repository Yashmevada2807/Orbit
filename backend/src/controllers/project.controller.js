import { Project } from "../models/project.model.js"
import { Task } from "../models/task.model.js"
import { User } from "../models/user.model.js"
import { WorkSpace } from "../models/workspace.model.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ProjectStatus } from "../utils/project.enum.js"
import { PriorityStatus, TaskStatus } from "../utils/tasks.enum.js"

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

const addTask = asyncHandler(async (req, res) => {

    const { name, username, description, priority } = req.body

    if (priority && !Object.values(PriorityStatus).includes(priority)) {
        throw new ApiError(400, "Invalid priority");
    }

    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) throw new ApiError(400, "Project not found")
    const user = await User.findOne({ username })
    if (!user) throw new ApiError(400, "User does not exists")

    const newTask = await Task.create({
        projectid: projectId,
        status: TaskStatus.todo,
        name,
        description,
        priority
    })

    newTask.assignedto.push(user._id)
    project.tasks.push(newTask._id)
    project.members.push(user._id)

    await newTask.save()
    await project.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newTask,
                "task added successfully"
            )
        )
})

const addMember = asyncHandler(async (req, res) => {
    const { username } = req.body
    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (!project) throw new ApiError(400, "Project does not exists")


    const user = await User.findOne({ username })
    const userExist = project.members.some(
        (id) => id.equals(user._id)
    );
    if (userExist) throw new ApiError(400, "User already a member")

    if (!user) throw new ApiError(400, "Username does not exists")

    project.members.push(user._id)

    await project.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { message: "member added successfully" }
            )
        )
})

export { createProject, addTask, addMember }