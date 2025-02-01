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
    doubts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt",
        default:[],
    }],
    orderTotal: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
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
    orderBidBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default:[],
    }]

}, { timestamps: true });
export const Orders = mongoose.model("Order", orderSchema);