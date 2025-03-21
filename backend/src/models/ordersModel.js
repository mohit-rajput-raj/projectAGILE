import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    budget: {
      type: Number,
    },
    orderBuilder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    holdByColabration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Colabration",
    },
    orderKey: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "newcreated",
        "accepted",
        "running",
        "undeployed",
        "shipped",
        "delivered",
        "paused",
        "rejected",
        "waiting",
        "todo",
      ],
      default: "newcreated",
    },
    visibleForAll: {
      type: Boolean,
      default: false,
    },
    ordertype: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
    unDeployed:{
        type:Boolean,
        default:true,
    },
    orderCancled: {
      type: Boolean,
      default: false,
    },
    orderEndsAt: {
      type: Date,
    },

    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    description: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    orderBanner: {
      type: String,
    },
    orderBidBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    address: {
      type: String,
      required: true,
      trim: true,
    },

    orderTotal: {
      type: Number,
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
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Orders = mongoose.model("Order", orderSchema);
