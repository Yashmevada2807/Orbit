import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import app from "./app.js"

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3001;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.error("mongoDb connection error has occured: ", error);
        process.exit(1)
    })