import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        let token=req.cookies.jwt;;
        
        

        if (!token) {
            console.error("No token provided");
            return res.status(401).json({ msg: "Please login to access this resource" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            
            if (!user) {
                console.error("User not found with token");
                return res.status(401).json({ msg: "User not found" });
            }

            req.user = user;
            next();
        } catch (err) {
            console.error("Token verification failed:", err);
            return res.status(401).json({ msg: "Invalid token" });
        }

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
// if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //     console.log('up');
            
        //     token = req.headers.authorization.split(' ')[1];
        // } 
        // else if (req.cookies && req.cookies.jwt) {
        //     console.log('down');
        //     token = req.cookies.jwt;
        // }
