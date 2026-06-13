import mongoose, { Schema } from "mongoose";


const workSpaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    discription: {
        type: String,
        optional: true,
        maxlength: [500, 'cannot exceed 500 characters']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
},
    {
        timestamps: true
    })

export const WorkSpace = mongoose.model("WorkSpace", workSpaceSchema)