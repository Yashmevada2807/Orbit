import mongoose from "mongoose"


export const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log("💯 MongoDb connected succesfully"); 
    } catch (error) {
        console.error("MongoDb connection error",error)
        process.exit(1);
    }
}