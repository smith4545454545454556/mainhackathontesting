import mongoose from "mongoose";
const TokenSchema = new mongoose.Schema({
    token: { type: String },
    user: { type: String }
})

const TokenModel = mongoose.model("Token", TokenSchema)
export default TokenModel