import express from "express"
import {registerUser, loginUser} from '../controllers/auth.controller.js';

const router = express.Router()


router.route("/register").post(registerUser)
router.router("login").post(loginUser)


export {router}