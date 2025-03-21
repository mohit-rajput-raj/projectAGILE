import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    read: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Notification = mongoose.model("Notification", notificationSchema);
