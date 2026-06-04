import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs";


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
        trim:true,
        lowercase:true
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
    bio:{
        type:String,
        maxlength: [500, 'Bio cannot exceed 500 characters'] 
    },
    skills:{
        type:[String],
        default:[]
    },
    githublink:{
        type:String,
    },
    linkedinlink:{
       type:String,
    },
    portfolio:{
        type:String,
    },
    accesstoken:{
        type:String
    },
    refreshtoken:{
        type:String
    }
},{
    timestamps:true
})

// hooks
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
            next()
        } catch (error) {
            next(error)
        }
})


export const User = mongoose.model("User", userSchema)