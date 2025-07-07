import express from "express"
import {registerUser, userLogin } from '../controllers/auth.controller.js';

const router = express.Router()


router.route("/register").post(registerUser)
router.router("login").post(userLogin)


export {router}