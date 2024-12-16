import axios from "axios"
import { baseUrl } from "../config/server"
export const register = async (data) => {
    console.log(baseUrl, "base")

    try {

        const response = await axios({
            url: `${baseUrl}/register`,
            method: "POST",
            data: data
        })
        return response

    }
    catch (error) {
        console.log(error)


    }
}

export const login = async (data) => {
    try {
        const response = await axios({
            url: `${baseUrl}/login`,
            method: "POST",
            data: data
        })
        return response

    }
    catch (error) {
        console.log(error)
    }


}

export const logout = async (id) => {
    try {
        const response = await axios({
            url: `${baseUrl}/logout`,
            method: "DELETE",
            data: {
                id: id
            }
        })
        return response

    }
    catch (error) {
        console.log(error)
    }


}