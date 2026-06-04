import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))

// cors Configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders:["Authorization", "Content-Type"]
}))

import healthCheckRouter from "./routes/healthcheck.route.js"
import authRouter from "./routes/auth.route.js"

app.use("/api/v1/healthcheck", healthCheckRouter )

app.use("/api/v1/auth", authRouter)

app.get("/", (req, res) => {
    res.send("hello dev");
})

export default app;