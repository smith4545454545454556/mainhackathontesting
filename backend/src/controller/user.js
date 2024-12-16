import * as UserService from "../service/user.js"

export const register = async (req, res) => {
    const { name, email, password, role } = req.body

    try {

        const response = await UserService.register(name, email, password, role)
        return res.status(200).json({ success: true, message: "user registered", response: response })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })

    }
}


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const response = await UserService.login(email, password)
        return res.status(200).json({ message: "logged in", accessToken: response["accessToken"], response: response["user"] })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}


export const logout = async (req, res) => {
    const { id } = req.body
    try {
        const response = await UserService.logout(id)
        return res.status(200).json({ success: true, message: "logged out", response: response })

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })

    }

}