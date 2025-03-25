import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum: ["User", "Post", "Comment", "Challenge", "Job", "Order", "Colabration", "Account"],
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

export const Report = mongoose.model("Report", reportSchema);
