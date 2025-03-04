import mongoose from "mongoose";


const colabrationSchema = new mongoose.Schema({
    colabMembers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
    colabName:{
        type: String,
        required: true,
        trim: true,
    },
    rating:{
        type: Number,
        default: 0,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
        trim: true,
    },
    caption:{
        type: String,
        required: true,
        trim: true,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
    ordersHolds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: [],
    }]
})

export const Colabration = mongoose.model("Colabration", colabrationSchema);