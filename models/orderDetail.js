import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    
  },
  { timestamps: true }
);

const OrderDetail = mongoose.model("orderDetails", orderDetailSchema);
export default OrderDetail;
