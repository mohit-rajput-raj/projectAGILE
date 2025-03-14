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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZyrVY1ktSmsw3tkJFd7JgqYBkhKJsl7IwA&s"
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