import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: Schema.Types.ObjectId, ref: "Role" }

})

UserSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret, next) => {
        const { password, __v, ...rest } = ret
        return rest
    }
})
UserSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)

        }
        next()


    }
    catch (error) {
        console.log(error)

    }
})

UserSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email: email })
    console.log(email, password, user.password)

    if (!user) {
        throw new Error("cannot find the user")
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        throw new Error("password doesnot match")
    }
    return user

}
const UserModel = mongoose.model("User", UserSchema)
export default UserModel