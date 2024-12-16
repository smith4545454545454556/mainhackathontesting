import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream"
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileName, bufferFile) => {
    return new Promise((resolve, reject) => {


        const response = cloudinary.uploader.upload_stream({
            resource_type: "auto", public_id: fileName

        }, (error, result) => {
            if (error) {
                console.log("cloudinary error")
                reject(new Error(error))
            }
            resolve(result)
        })
        const bufferSteam = new Readable()
        bufferSteam.push(bufferFile)
        bufferSteam.push(null)
        bufferSteam.pipe(response)


    })


}


