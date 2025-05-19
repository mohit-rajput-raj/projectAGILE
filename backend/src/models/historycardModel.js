import mongoose from "mongoose";

const HistoryCardSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    
    orderPaid: {
        type: Boolean,
        required: true
    }
});

export const Hist = mongoose.model("hist",HistoryCardSchema);