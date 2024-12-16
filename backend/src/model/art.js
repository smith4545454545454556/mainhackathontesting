import mongoose, { Schema } from "mongoose";

const ArtSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    cover: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },

    }]
})
const ArtModel = mongoose.model("Art", ArtSchema)
export default ArtModel