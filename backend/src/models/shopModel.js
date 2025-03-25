import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true,
        unique: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    shopKey: {
        type: String,
        required: true,
    },
    shopStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "pending",
    },
    shopOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})