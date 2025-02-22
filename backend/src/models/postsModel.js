import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default:""
    },
    video: {
      type: String,
      default:""
    },
    file: {
      type: String,
      default:""
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        id:{
          type:Number,
          default:new Date().getTime(),
        },
        replies: [
          {
            text: {
              type: String,
              required: true,
            },
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const posts = mongoose.model("posts", postSchema);
