import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"


const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: `https://placehold.co/200x200`,
            localPath: ""
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phonenumber: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    skills: {
        type: [String],
        default: []
    },
    githublink: {
        type: String,
    },
    linkedinlink: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean
    },
    emailverificationToken: {
        type: String,
        default: false
    },
    emailVerificationExpiry: {
        type: Date
    },
    refreshtoken: {
        type: String
    }
}, {
    timestamps: true
})

// methods

userSchema.methods.generateAccessToken = function () {
    return jwt
        .sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt
        .sign(
            { _id: this._id, },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
            }
        )
}


userSchema.methods.generateEmailVerificationToken = function () {
    const unHashedToken = crypto.randomBytes("32").toString("hex")

    const hashedToken = crypto.hash("sha256", unHashedToken, "hex")

    const tokenExpiry = Date.now() + 1000 * 60 * 60;

    this.emailverificationToken = hashedToken
    this.emailVerificationExpiry = tokenExpiry

    return { unHashedToken, hashedToken, tokenExpiry }
}



// hooks
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        new ApiError(500)
    }
})


export const User = mongoose.model("User", userSchema)