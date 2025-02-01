import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    adminID: {
        type: String,
        required: true,
        unique: true,
    },
    adminKey: {
        type: String,
        required: true,
        
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

    
}, { timestamps: true });
export const Admins = mongoose.model("Admin", adminSchema);