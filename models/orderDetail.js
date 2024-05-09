import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total_cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderDetail = mongoose.model("orderDetails", orderDetailSchema);

export default OrderDetail;
