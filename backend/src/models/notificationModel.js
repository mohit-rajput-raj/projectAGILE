import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    read:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});
export const Notification = mongoose.model("Notification", notificationSchema);