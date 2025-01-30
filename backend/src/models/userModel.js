import mongoose from "mongoose";
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
        required: true,
        trim: true,
        minlength: 3,
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
    profile:{

        isVerified: {
            type: Boolean,
            default: false,
        },
        Pic: {
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
        createdAt: {
            type: Date,
            default: Date.now,
        },
        
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
        chalanges: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chalange",
        }],
        notifications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
        }],
         


    }




}, { timestamps: true });

export const User = mongoose.model("User", userModel);