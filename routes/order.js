import express from "express";
import axios from "axios";
import CryptoJS from "crypto-js"; // npm install crypto-js
import moment from "moment"; // npm install moment
import qs from "qs";
import Order from "../models/order.js";
import { orderController } from "../controllers/index.js";
import OrderDetail from "../models/orderDetail.js";
import Cart from "../models/cart.js";

const orderRouter = express.Router();

orderRouter.get("/", orderController.getAllOrder);
orderRouter.put("/:id", orderController.updateOrder);
orderRouter.get("/user/:id", orderController.getListOrderOfUser);
orderRouter.get("/:id", orderController.getOrderById);

orderRouter.post("/", async (req, res) => {
  const { paymentMethod, listCart, user } = req.body;

  // Function to calculate the total amount of the order
  const calculateTotal = (listCart) => {
    return listCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (paymentMethod === "COD") {
    try {
      // Save order items and collect their IDs
      const orderDetails = await Promise.all(
        listCart.map(async (item) => {
          const orderDetail = new OrderDetail({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.price,
          });
          await orderDetail.save();
          return orderDetail._id;
        })
      );

      // Create and save the order
      const order = new Order({
        userId: user,
        items: orderDetails,
        totalAmount: calculateTotal(listCart),
        paymentMethod: paymentMethod,
        status: "Pending", // đặt trạng thái mặc định là pending khi đặt hàng xong
      });

      const savedOrder = await order.save();

      // xoá sản phẩm trong giỏ hàng khi đã đặt hàng
      await Cart.deleteMany({ userId: user });

      return res.status(200).json({
        message: "Đặt hàng thành công",
        order: savedOrder,
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Error saving the order to the database" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Phương thức thanh toán không hợp lệ" });
  }
});

export default orderRouter;
