import { uploadToCloudinary } from "../cloudinary/cloudinary.js"
import * as ArtService from "../service/art.js"

export const getArt = async (req, res) => {
    try {
        const art = await ArtService.getArt()
        return res.status(200).json({ message: "all arts", art: art })
    }

    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


export const addArt = async (req, res) => {
    const { name, description, user } = req.body
    try {
        console.log(user, "user Id");

        const cover = req.file.originalname
        const bufferFile = req.file.buffer
        const response = await uploadToCloudinary(cover, bufferFile)

        const art = await ArtService.addArt(name, description, response.secure_url, user)
        return res.status(200).json({ message: "art added", art: art })

    }
    catch (error) {
        return res.status(400).json({ message: error.message })


    }

}

export const like = async (req, res) => {
    try {
        const { userId, artId } = req.body
        const response = await ArtService.like(userId, artId)
        return res.status(200).json({ message: "liked", response: response })

    }
    catch (error) {
        return res.status(400).json({ message: error.message })


    }


}

export const comment = async (req, res) => {
    const { userId, artId, text } = req.body
    const response = await ArtService.comment(userId, artId, text)
    return res.status(200).json({ message: "commented", response: response })
}