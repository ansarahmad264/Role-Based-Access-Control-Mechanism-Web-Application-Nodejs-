import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import ApoResponse from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async(req,res) =>{
    try{
        const { fullName, username, email, password, role} = req.body

        if(!fullName || !username || !email || !password || !role){
            throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        })
        if(existedUser){
            throw new ApiError(400, "user with this email or username is already registered")
        }

        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password,
            role
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")
        if (!createdUser) {
            throw new ApiError(500, "Server was unable to seve user to the Database")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )

    }catch(err){
        throw new ApiError(500, "something went wront while registering user", err.message)
    }
    

    
})

const loginUser = async(req,res) =>{

}

export {
    registerUser,
    loginUser
}