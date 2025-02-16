import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    acceptedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    file: {
      type: String,
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        default: [],
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },
    
    status: {
      type: String,
      required: true,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);


export const Challenge = mongoose.model("Challenge", challengeSchema);
