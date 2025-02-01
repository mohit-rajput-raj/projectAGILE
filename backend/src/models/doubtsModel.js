import mongoose from "mongoose";
const doubtSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    seen:{
        type:Boolean,
        default:false,
    },
    answer:{
        type:String,
        default:"",
    },
    answered:{
        type:Boolean,
        default:false,
    },
    answerDate:{
        type:Date,
        default:Date.now,
    },

},{timestamps:true});
export const Doubt = mongoose.model("Doubt", doubtSchema);