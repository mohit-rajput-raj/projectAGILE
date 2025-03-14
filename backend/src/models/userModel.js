import mongoose from "mongoose";
import { exp } from "three/tsl";
const userModel = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required:true,
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
    messagesBar: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        
    }],
    

    profile:{
        notifications:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
        }],
        skills:[{
            skillname: {
                type: String,
            },
            skillexp: {
                type: String,
            },

        }],
        
        experience: [
			{
				title: String,
				company: String,
				startDate: Date,
				endDate: Date,
				description: String,
			},
		],
		education: [
			{
				school: String,
				fieldOfStudy: String,
				startYear: Number,
				endYear: Number,
			},
		],
        certificates:[{
            type: String,
        }],
        fields:[{
            type:String,
        }],
        colabration:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Colabration",
        }],
        accounts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        }],
        
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
            default:"",
        },
        bannerImg:[{
            type: String,
            default: ""
        }],
        about: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        websites: [{
            type: String,
            default: "",
        }],
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
        address:{
            type: String,
            default: "",
        },
    
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