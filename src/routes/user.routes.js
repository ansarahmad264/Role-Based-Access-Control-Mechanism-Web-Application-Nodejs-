import express from "express"
import { admin, manager, user } from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/Auth.js"
import { authorizeRoles } from "../middlewares/RoleMiddleware.js"

const userRouter = express.Router()

userRouter.route('/admin').get(verifyJWT,authorizeRoles("admin") ,admin)
userRouter.route('/manager').get(verifyJWT, authorizeRoles("admin","manager") ,manager)
userRouter.route('/user').get(verifyJWT, authorizeRoles("admin", "manager", "user") ,user)


export {userRouter}