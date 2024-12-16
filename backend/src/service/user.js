import RoleModel from "../model/role.js"
import TokenModel from "../model/token.js"
import UserModel from "../model/user.js"
import jwt from "jsonwebtoken"

export const register = async (name, email, password, roleName) => {
    const findEmail = await UserModel.findOne({ email: email })
    if (findEmail) {
        throw new Error("user already register, go to login")
    }
    const role = await RoleModel.findOne({ name: roleName })

    const user = new UserModel({
        name: name,
        email: email,
        password: password,
        role: role._id
    })
    await user.save()
    await user.populate("role")
    return user

}

export const generateAccessToken = async (id, email, role) => {
    const accessToken = jwt.sign({
        id: id,
        email: email,
        role: role

    }, process.env.SECRET_ACCESS_TOKEN)
    return accessToken

}


export const login = async (email, password) => {
    const user = await UserModel.findByCredentials(email, password)

    const accessToken = await generateAccessToken(user._id, user.email, user.role)
    if (!user) {
        throw new Error("cannot login")
    }
    const token = new TokenModel({
        token: accessToken,
        user: user.id
    })
    await token.save()
    const response = {
        user: user,
        accessToken: accessToken
    }
    return response


}

export const logout = async (id) => {
    const user = await TokenModel.findOneAndDelete({ user: id })
    if (!user) {
        throw new Error("cannot find the user")
    }
    return user

}