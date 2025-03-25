import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../library/genToken.js";
import { sendOTPEmail } from "../library/sendEmail.js";
import cloudinary from "../library/cloud.js";
import { Admins } from "../models/adminModel.js";
export const about = async (req, res) => {
    res.json({ msg: "hell yeah" });
};

export const updatePfp = async (req, res) => {
    
    const userId = req.user._id;
    let { name, lastName, shopname } = req.body;
    const profilePic = req.files?.pic;
    const bannerImg = req.files?.bannerImg;
    try {
        const updateData = {};
        const user = await User.findById(userId);
        if (name?.trim()) updateData.name = name.trim();
        if (lastName?.trim()) updateData.lastName = lastName.trim();
        if (shopname?.trim()) updateData.shopname = shopname.trim();

        if (profilePic) {
            console.log("Uploading image to Cloudinary...");
            try {
                if(user.profile.pic){
                    const response = await cloudinary.uploader.destroy(user.profile.pic);
                }
                const uploadResponse = await cloudinary.uploader.upload(profilePic.tempFilePath, {
                    folder: 'user_profiles',
                    
                });
                updateData['profile.pic'] = uploadResponse.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ msg: "Failed to upload profile picture. Please try again." });
            }
        }

        if (bannerImg) {
            console.log("Uploading banner image to Cloudinary...");
            try {
                if(user.profile.bannerImg){
                    const response = await cloudinary.uploader.destroy(user.profile.bannerImg);
                }
                const uploadResponse = await cloudinary.uploader.upload(bannerImg.tempFilePath, {
                    folder: 'user_banners',
                    // transformation: [
                    //     { width: 1920, height: 1080, crop: 'fill' },
                    //     { quality: 'auto:good' }
                    // ]
                });
                updateData['profile.bannerImg'] = uploadResponse.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ msg: "Failed to upload banner image. Please try again." });
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ msg: "No data provided for update" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "Profile updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error in updatePFP:", error);
        return res.status(500).json({ msg: "Server error during profile update" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "All fields are required" });
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });
        if(user.profile.isBanned){
            return res.status(400).json({ msg: "your profile is banned" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        genToken(user._id, res);
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ msg: error.message });
    }
};

export const register = async (req, res) => {
    const { email, password, phone, confirmPassword, role, username } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !password || !phone || !role || !confirmPassword || !username) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    if (!emailRegex.test(email)) return res.status(400).json({ msg: "Invalid email format" });
    if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords do not match" });
    if (password.length < 3) return res.status(400).json({ msg: "Password must be at least 3 characters long" });
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "User already exists" });
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ username, email, password: hashPassword, phone, profile: { role } });
        const savedUser = await newUser.save();
        
        if (savedUser) {
            genToken(savedUser._id, res);
            return res.status(201).json(savedUser);
        }
        return res.status(401).json({ msg: 'Registration failed' });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ msg: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth:", error);
        return res.status(500).json({ msg: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ msg: error.message });
    }
};

export const sendPasswordResetOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        
        sendOTPEmail(email, otp, user.username);
        return res.status(200).json({ msg: "OTP sent to your email" });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ msg: "Failed to send OTP" });
    }
};

export const verifyOTPAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, resetPasswordOTP: otp, resetPasswordOTPExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ msg: "Invalid or expired OTP" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpiry = undefined;
        await user.save();

        return res.status(200).json({ msg: "Password reset successfully" });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ msg: "Failed to reset password" });
    }
};
