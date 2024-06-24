import mongoose, { Schema } from "mongoose";

const receiptSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    // version: {
    //   type: String,
    //   required: true,
    // },
    // color: {
    //   type: String,
    //   required: true,
    // },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    // total: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Receipt = mongoose.model("receipts", receiptSchema);

export default Receipt;
