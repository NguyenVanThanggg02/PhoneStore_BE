import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('orders', orderSchema)

export default Order;