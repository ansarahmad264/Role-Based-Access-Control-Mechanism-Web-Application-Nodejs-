import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const admin = asyncHandler(async(req,res) =>{
    return res.status(200).json( new ApiResponse(200, " Welcome Admin"))
})

const manager = asyncHandler(async(req,res) =>{
    return res.status(200).json( new ApiResponse(200, " Welcome Manager"))
})

const user = asyncHandler(async(req,res) =>{
    return res.status(200).json( new ApiResponse(200, " Welcome User"))
})

export {
    admin,
    manager,
    user
}