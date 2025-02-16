import { User } from "../models/userModel.js";
// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import genToken from "../library/genToken.js";
import { Pass } from "three/examples/jsm/Addons.js";
// import jwt from "jsonwebtoken";
export const about = async (req, res) => {
    res.json({mgs:"hell yeah"});
} 
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    
    try {
        if (!email || !password) {
            console.log({ msg: "All fields are required" });
            
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log({ msg:"User does not exist"});
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log({ msg: "Invalid credentials" });
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        genToken(user._id, res);

        return res.status(201).json({
            _id:user._id,
            email:user.email,
            role: user.profile.role,
            phone: user.phone
        });

    } catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ msg: error.message });
    }
};

export const register = async (req, res) => {
    const {  email, password , phone, confirmPassword, role,username} = req.body;
    try {
        if( !email || !password || !phone || !role || !confirmPassword ||!username){
            return res.status(400).json({msg:"All fields are required"});
        }
        if(password!=confirmPassword){
            return res.status(400).json({msg:"password does not match"});
        }
        if(password.length < 3 ){
            return res.status(400).json({msg:"Password must be at least 3 characters long"});
        }
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            phone,
            profile: {
                role
            }
        });
        const savedUser = await newUser.save();
        if(savedUser){
            genToken(savedUser._id, res);
            return res.status(201).json({
                _id: savedUser._id,
                username:savedUser.username,
                email: savedUser.email,
                role: savedUser.profile.role,
                phone: savedUser.phone
            });
        }
        return res.status(401).json({msg:'not found'});
    } catch (error) {
        console.log("error in sigin",{error});
        
        return res.status(500).json({msg: error.message});
    }

   
}

export const checkAuth = async (req, res) => {
    try{
        
        return res.status(200).json(req.user);


    }catch(error){
        console.log("error in checkAuth",{error});
        
        return res.status(500).json({msg: error.message});
    }
}
export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ msg: "logout" });
        
    } catch (error) {
        console.log("error in logout",{error});
        
        return res.status(500).json({msg: error.message});
    }
}

export const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();


    res.status(200).json({ 
      message: "Password reset OTP has been sent to your email",
      email 
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

export const verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ 
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error('Password reset verification error:', error);
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};
