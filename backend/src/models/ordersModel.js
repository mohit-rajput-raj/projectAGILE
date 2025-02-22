import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    orderKey: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["pending", "accepted", "shipped", "delivered","paused", "rejected"],
        default: "pending",
        required: true,
    },

    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    description:{
        type:String,
        required:true,
        trim:true,
    },
    orderBidBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    doubts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt",
        default:[],
    }],
    orderTotal: {
        type: Number,
        required: true,
    },
    orderBuildDate: {
        type: Date,
    },
    orderActiveDate: {
        type: Date,
    },
    deadLine: {
        type: Date,
    },
    orderCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderAddress: {
        type: String,
        required: true,
    },
    orderDealyed: {
        type: Boolean,
        default: false,
    },
    orderDelivered: {
        type: Boolean,
        default: false,
    },
    orderPaid: {
        type: Boolean,
        default: false,
    },
    orderPaymentMethod: {
        type: String,
        required: true,
    },
    orderPaymentStatus: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
        required: true,
    },
    orderPaymentDate: {
        type: Date,
        required: true,
    },
    orderPaymentRef: {
        type: String,
        required: true,
    },
    orderPaymentAmount: {
        type: Number,
        required: true,
    },
    orderPaymentCurrency: {
        type: String,
        required: true,
    },
    orderHoldedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },

}, { timestamps: true });
export const Orders = mongoose.model("Order", orderSchema);