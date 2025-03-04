import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {  
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
        author: {  
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
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
          type: Number,
          default: () => new Date().getTime(),  
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
            id: {
              type: Number,
              default: () => new Date().getTime(),  
            },
            createdAt: {
              type: Date,
              default: Date.now,
            }
          }
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
