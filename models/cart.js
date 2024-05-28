import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    // productName: {
    //   type: String,
    //   required: true,
    // },
    quantity: {
      type: Number,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // images: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);

export default Cart;
