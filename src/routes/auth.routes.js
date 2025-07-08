import express from "express"
import {registerUser, userLogin, userLogout } from '../controllers/auth.controller.js';
import { verifyJWT } from "../middlewares/Auth.js";
import { validate } from "../middlewares/validateRequest.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = express.Router()


router.route("/register").post(validate(registerSchema) ,registerUser)
router.route("/login").post(validate(loginSchema) ,userLogin)
router.route("/logout").post(verifyJWT, userLogout)


export {router}