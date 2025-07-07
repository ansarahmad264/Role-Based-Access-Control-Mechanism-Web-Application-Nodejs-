import { ApiError } from "../utils/ApiError.js"

const authorizeRoles = (...allowedRoles) => {
    return  (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            throw new ApiError(403, "You do not have permission to access this resource")
        }
        next()
    }
}

export {authorizeRoles}