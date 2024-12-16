import mongoose from "mongoose"
import { MONGODB_URL } from "./server.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("connected to DB")

    }
    catch (error) {
        console.log(error)
    }
}