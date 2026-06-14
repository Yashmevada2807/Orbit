import mongoose, { Schema } from "mongoose";
import { TaskEnum, PriorityEnum } from "../utils/tasks.enum.js";


const taskSchema = new Schema({
    projectid: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    status: {
        type: String,
        enum: TaskEnum,
        default: "ToDo"
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        maxlength: [300, "description should be short"]
    },
    assignedto: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    priority: {
        type: String,
        enum: PriorityEnum,
    }
},
    {
        timestamps: true
    })

export const Task = mongoose.model("Task", taskSchema)