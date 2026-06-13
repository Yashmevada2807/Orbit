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


export { createWorkspace }