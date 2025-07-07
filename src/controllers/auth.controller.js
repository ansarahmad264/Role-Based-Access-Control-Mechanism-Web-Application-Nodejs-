import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something Went wrong while generating Refresh and Access Token")
    }
}

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

const userLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
    
        if (!email || !password) {
            throw new ApiError(400, "All Fields are Required")
        }
    
        const user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(404, "This User Doesnot Exist")
        }
    
        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            throw new ApiError(404, "Invalid User Credentials")
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true,
        }
    
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User Logged in Successfully"
                )
            )

    } catch (error) {
        throw new ApiError(500, "Something went wrong while Logging in User", error)
    }

})


export {
    registerUser,
    userLogin
}