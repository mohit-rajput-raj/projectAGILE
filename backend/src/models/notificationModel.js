import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    accepted: {
			type: Boolean,
			default: false,
		},
    rejected: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Like",
        "Comment",
        "Connection",
        "Follow",
        "Connection",
        "joinColabration",
        "leaveColabration",
        "Orders",
        "newChallenge",
        "Jobs",
        "privateOd",
        "publicOd",
        "connection_request",
        "connection_accepted",
        "connection_rejected",
        "Disconnection",

      ],
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Notification = mongoose.model("Notification", notificationSchema);
