import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js"



const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({email})
    if(user) throw new ApiError(400, "User already registered");

    const newUser = await User.create({
        username,
        email,
        password
    })

    res.status(200).json(new ApiResponse(200, newUser,"user register successfully"))


})


export { registerUser }