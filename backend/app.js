import express from "express"
import dotenv from "dotenv"
import { router as UserRouter } from "./src/route/user.js"
import { router as ArtRouter } from "./src/route/art.js"
dotenv.config()
const app = express()
app.use(express.json())
app.use("/api", UserRouter)
app.use("/api", ArtRouter)
export default app