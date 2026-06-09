import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js";
import { uploadImage } from "../utils/upload-image.js";


const createProfile = asyncHandler(async (req, res) => {

    const { fullname, phonenumber, bio, skills, githubLink, portfolioLink, linkedInLink } = req.body

    const avatar = uploadImage(req.file)

    const user = req.user

    user.avatar = avatar
    user.fullname = fullname
    user.phonenumber = phonenumber
    user.bio = bio
    user.skills = JSON.parse(skills)
    user.githublink = githubLink
    user.portfolio = portfolioLink
    user.linkedinlink = linkedInLink

    await user.save({ validateBeforeSave: false })

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "profile updated succesfully"
            )
        )
})


export { createProfile }