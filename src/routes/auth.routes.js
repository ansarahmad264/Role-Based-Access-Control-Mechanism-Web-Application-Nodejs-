import express from "express"
import {registerUser, userLogin, userLogout } from '../controllers/auth.controller.js';
import { verifyJWT } from "../middlewares/Auth.js";

const router = express.Router()


router.route("/register").post(registerUser)
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJWT, userLogout)


export {router}