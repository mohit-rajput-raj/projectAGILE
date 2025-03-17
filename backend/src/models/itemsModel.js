import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    parentId:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        default:"",
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    
    type:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        default:""
    },
    rating:{
        type:Number,
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        default:[],
    }],
    tags:[{
        type:String,
        default:[],
    }],
    
},{timestamps:true});
export const Item = mongoose.model("Item", itemSchema);