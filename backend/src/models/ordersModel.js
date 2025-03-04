import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    holdByColabration:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Colabration",
    },
    orderKey: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["pending", "accepted","running","deploy", "shipped", "delivered","paused", "rejected"],
        default: "deploy",
        required: true,
    },
    visibleForAll:{
        type:Boolean,
        default:false,
    },
    orderCancled:{
        type:Boolean,
        default:false,
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
    caption:{
        type:String,
        required:true,
        trim:true,
    },
    orderBanner:{
        type:String,
    },
    orderBidBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
        enum: ["cash", "card", "bank"],
    },
    orderPaymentStatus: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
        required: true,
    },
    orderPaymentDate: {
        type: Date,
    },
    orderPaymentRef: {
        type: String,
    },
    orderPaymentAmount: {
        type: Number,
    },
    orderPaymentCurrency: {
        type: String,
    },
    orderHoldedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },

}, { timestamps: true });
export const Orders = mongoose.model("Order", orderSchema);