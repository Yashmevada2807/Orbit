import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser())

// cors Configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders:["Authorization", "Content-Type"]
}))

import healthCheckRouter from "./routes/healthcheck.route.js"
import authRouter from "./routes/auth.route.js"
import profileRouter from "./routes/profile.route.js"
import workSpaceRouter from "./routes/workspace.route.js"
import projectRouter from "./routes/project.route.js"

app.use("/api/v1/healthcheck", healthCheckRouter )

app.use("/api/v1/auth", authRouter)

app.use("/api/v1/profiles", profileRouter)

app.use("/api/v1/workspaces", workSpaceRouter)

app.use("/api/v1/projects", projectRouter)


app.get("/", (req, res) => {
    res.send("hello dev");
})

export default app;