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
