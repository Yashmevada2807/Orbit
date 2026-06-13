import mongoose, { Schema } from "mongoose";
import { ProjectEnum } from "../utils/project.enum.js";


const projectSchema = new Schema({
    workspaceid: {
        type: Schema.Types.ObjectId,
        ref: "WorkSpace",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        optional: true,
        maxlength: [1500, "cannot exceed 1500 characters"]
    },
    enddate: {
        type: Date
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }],
    status: {
        type: String,
        enum: ProjectEnum,
        default: "InProgress"
    }
},
    {
        timestamps: true
    })

export const Project = mongoose.model("Project", projectSchema)