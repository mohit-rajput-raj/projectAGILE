import mongoose from "mongoose";
import { tri } from "three/tsl";
const supremeAdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    company:{
        type:String,
        required:true,
        trim:true,
    },
    adminList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default:[],
    }],
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    officeKey:{
        type:String,
        required:true,
    },
},{timestamps:true});
export const SupremeAdmins = mongoose.model("SupremeAdmin", supremeAdminSchema);