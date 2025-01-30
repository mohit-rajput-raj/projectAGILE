// import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
 const genToken = (USERid, res) => {
    try {
        const token = jwt.sign({USERid}, process.env.JWT_SECRET, {
            expiresIn: '30d'
    
        });
        res.cookie("jwt", token, {
            maxAge: 25 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: "strict", 
            
        });
        
    } catch (error) {
        console.log("error in genToken", {error});
        return res.status(500).json({msg: error.message});
        
    }
    return token;
}
export default genToken;
