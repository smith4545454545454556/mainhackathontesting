import express from "express"
import * as ArtController from "../controller/art.js"
import upload from "../multer/multer.js"

export const router = express.Router()
router.post("/addArt", upload.single("cover"), ArtController.addArt)
router.get("/getArt", ArtController.getArt)
router.post("/like", ArtController.like)
router.post("/comment", ArtController.comment)