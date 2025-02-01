import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
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
    stock:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
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