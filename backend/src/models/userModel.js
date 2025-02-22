import mongoose from "mongoose";
const userModel = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        require:true,
        minlength: 1,
        maxlength: 50
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
        minlength: 3,
    },
    resetPasswordOTP: {
        type: String,
        default: "",
    },
    resetPasswordOTPExpiry: {
        type: Date,
        default: Date.now,
    },
    acountType: {
        type: String,
        default: "user",
    },
    contactNumber:{
        type: String,
        default: "0000000000",
    },
    phone:{
        type: String,
        required: true,
    },
    offrJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "nothings",
        }
    ]
    ,

    profile:{
        
        role:{
            type:String,
            required:true,
            default:"user"

        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        pic: {
            type: String,
            default: "",
        },
        bannerImg:[{
            type: String,
            default: ""
        }],
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
        closedConnections: [
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
