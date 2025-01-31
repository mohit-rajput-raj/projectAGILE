import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({msg: "Unauthorized"});
        }
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg: "Unauthorized"});
        }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const user = await User.findById(decoded.USERid).select("-password");
        if(!user){
            return res.status(401).json({msg: "Unauthorized"});
        }
        req.user = user;
        next();

        
    } catch (error) {
        console.log("error in auth", {error});
        return res.status(500).json({msg: error.message});
        
    }
}

