import express from "express";

const app = express();


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))

import { router as userRouter} from "./routes/auth.routes";

app.use("/api/v1/auth", userRouter)

export {app}