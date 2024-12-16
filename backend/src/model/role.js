import mongoose from "mongoose";
const RoleScheme = new mongoose.Schema({
    name: { type: String }
})
const RoleModel = mongoose.model("Role", RoleScheme)
export default RoleModel