import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({msg: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRETS);
        if(!decoded){
            return res.status(401).json({msg: "Unauthorized"});
        }

        const user = await User.findById(decoded.USERid);
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