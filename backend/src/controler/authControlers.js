import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import genToken from "../library/genToken.js";
export const about = async (req, res) => {
    res.json({mgs:"hell yeah"});
} 
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({msg:"All fields are required"});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"User does not exist"});
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        genToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profile.Pic,
        });
        
    } catch (error) {
        console.log("error in login",{error});
        
        return res.status(500).json({msg: error.message});
    }
}  
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({msg:"All fields are required"});
        }
        if(password.length < 8){
            return res.status(400).json({msg:"Password must be at least 8 characters long"});
        }
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email,password: hashPassword});
        if(newUser){
            genToken(newUser._id, res);
            newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profile.Pic,
            });
        }
    } catch (error) {
        console.log("error in sigin",{error});
        
        return res.status(500).json({msg: error.message});
    }

    res.json('register');
}
export const logout= async (req,res)=>{
   try {
    console.log("error in sigin",{error});
        
    return res.status(500).json({msg: error.message});
   } catch (error) {
    console.log("error in logout",{error});
    
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
export const updateProfile = async (req, res) => {
    const {pic ,  bio, website} = req.body;
    try{
        
    }catch(error){
        console.log("error in updateProfile",{error});
        
        return res.status(500).json({msg: error.message});
    }
}
export const settings = async (req, res) => {
    
    try{
        
    }catch(error){
        console.log("error in settings",{error});
        
        return res.status(500).json({msg: error.message});
    }
}


