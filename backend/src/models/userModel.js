import mongoose from "mongoose";
import { update } from "three/examples/jsm/libs/tween.module.js";
const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    name: {
        type: String,
        trim: true,
        minlength: 3,
    },
    lastName:{
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    acountType: {
        type: String,
        default: "user",
    },
    contact:{
        type: String,
        default: "",
    },
    profile:{

        isVerified: {
            type: Boolean,
            default: false,
        },
        pic: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
        followers:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    
        saved: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }],
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }]
        ,
        
        
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        isPrivate: {
            type: Boolean,
            default: false,
        },

        challenge: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chalange",
        }],
        notifications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
        }],
        history: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "History",
        }],
        blockedBy:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"BlockedBy",
        }],
   
    }




}, { timestamps: true });

export const User = mongoose.model("User", userModel);
