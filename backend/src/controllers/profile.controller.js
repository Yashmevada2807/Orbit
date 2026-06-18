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

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshtoken -isEmailVerified -emailVerificationToken -emailVerificationExpiry -email -fullname -phonenumber -githublink -linkedinlink -portfolio -createdAt -updatedAt -__v")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
            )
        )
})

const getUserProfile = asyncHandler(async (req, res) => {

    const { username } = req.params
    if (!username) throw new ApiError(400, "username is required")

    const user = await User.findOne({ username }).select("-password -refreshtoken -isEmailVerified -emailVerificationToken -emailVerificationExpiry")
    if (!user) throw new ApiError(404, "User does not exists")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user
            )
        )
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user._id).select("-password -refreshtoken -isEmailVerified -emailVerificationToken -emailVerificationExpiry")

    return res  
        .status(200)
        .json(
            new ApiResponse(
                200,
                user
            )
        )


})

const updateProfile = asyncHandler(async (req, res) => {
    const { fullname, username, phonenumber, bio } = req.body

    const updatedUserProfile = await User.findById(req.user._id).select("-password -refreshtoken -isEmailVerified -emailVerificationToken -emailVerificationExpiry")

    if (fullname) updatedUserProfile.fullname = fullname
    if (username) updatedUserProfile.username = username
    if (phonenumber) updatedUserProfile.phonenumber = phonenumber
    if (bio) updatedUserProfile.bio = bio

    await updatedUserProfile.save()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedUserProfile,
                "User Profile Updated Successfully."
            )
        )


})


export { createProfile, getUsers, getCurrentUserProfile, updateProfile, getUserProfile }