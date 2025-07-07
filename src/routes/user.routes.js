import express from "express"
import { admin, manager, user } from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/Auth.js"

const userRouter = express.Router()

userRouter.route('/admin').get(verifyJWT, admin)
userRouter.route('/manager').get(verifyJWT, manager)
userRouter.route('/user').get(verifyJWT, user)


export {userRouter}