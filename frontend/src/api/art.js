import axios from "axios";
import { baseUrl } from "../config/server";

export const getArt = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/getArt`,
            method: "GET"

        })
        console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }


}

export const addArt = async (data) => {
    try {

        const art = await axios({
            url: `${baseUrl}/addArt`,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            }

        })
        return art
    }
    catch (error) {
        console.log(error)
    }
}

export const likeArt = async (data) => {
    console.log(data);

    try {
        const like = await axios({
            url: `${baseUrl}/like`,
            method: "POST",
            data: data,

        })
        return like

    }
    catch (error) {
        console.log(error)
    }
}

export const comment = async (data) => {
    try {
        const comment = await axios({
            url: `${baseUrl}/comment`,
            method: "POST",
            data: data,

        })
        return comment

    }
    catch (error) {
        console.log(error)
    }

}