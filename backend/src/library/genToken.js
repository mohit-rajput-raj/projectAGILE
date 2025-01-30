// import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
const genToken = (USERid, res) => {
    const token = jwt.sign({USERid}, process.env.JWT_SECRET, {
        expiresIn: '30d'

    });
    res.cookie("jwt", token, {
        maxAge: 25 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development",
      });
    return token;
}
