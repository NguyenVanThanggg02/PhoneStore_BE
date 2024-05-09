import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("comments", commentSchema);

export default Comment;
export {commentSchema};