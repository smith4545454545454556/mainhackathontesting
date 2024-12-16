import express from "express"
import * as UserController from "../controller/user.js"

export const router = express.Router()
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.delete("/logout", UserController.logout) 