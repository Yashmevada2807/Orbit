import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js"
import { sendVerificationEmail } from "../utils/send-verification-email.js";
import crypto from "crypto"
import bcrypt from "bcryptjs";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshtoken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong while generation accesstoken"
        )
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({ email })
    if (user) throw new ApiError(400, "User already registered");

    const newUser = await User.create({
        username,
        email,
        password
    })
    const { unHashedToken, hashedToken, tokenExpiry } = newUser.generateEmailVerificationToken()

    newUser.emailVerificationToken = hashedToken
    newUser.emailVerificationExpiry = tokenExpiry

    await newUser.save({ validateBeforeSave: false });
    const verificationUrl =
        `http://localhost:3000/api/v1/auth/verify-email/${unHashedToken}`;

    await sendVerificationEmail({
        email: newUser.email,
        username: newUser.username,
        verificationUrl
    })


    return res.status(201).json(
        new ApiResponse(
            201,
            {
                email: newUser.email,
                username: newUser.username
            },
            "Registration successful. Please verify your email."
        )
    );


})

const verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.params

    const hashedToken = crypto.hash("sha256", token, "hex")

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() }
    })
    if (!user) throw new ApiError(400, "This link is expired or has already been used. Please try logging in.")
    user.isEmailVerified = true
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    await user.save()

    res.status(200).json(
        new ApiResponse(
            200,
            {
                email: user.email
            },
            "email verified successfully"
        )
    )
})

const resendEmailVerificationLink = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) throw new ApiError(400, "user not found. Please register first")
    const isVerified = user.isEmailVerified
    if (isVerified) throw new ApiError(400, "user already verified")

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateEmailVerificationToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })
    const verificationUrl =
        `http://localhost:3000/api/v1/auth/verify-email/${unHashedToken}`;

    await sendVerificationEmail({
        email: user.email,
        username: user.username,
        verificationUrl
    })


    return res.status(201).json(
        new ApiResponse(
            201,
            {
                email: user.email,
                username: user.username
            },
            "A fresh verification link has been sent to your email."
        )
    );

})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) throw new ApiError(401, "username not found")
    const isVerified = await user.isEmailVerified
    if (!isVerified) throw new ApiError(401, "please verify your email first")

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) throw new ApiError(401, "invalid username or password")

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .cookie("accesstoken", accessToken, options)
        .cookie("refreshtoken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    _id: user._id,
                    email: user.email
                },
                "user loggedin succesfully"
            )
        )

})


export { registerUser, verifyUser, loginUser, resendEmailVerificationLink }