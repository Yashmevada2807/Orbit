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
})

export const Task = mongoose.model("Task", taskSchema)