import express from "express";
import axios from "axios";
import CryptoJS from "crypto-js"; // npm install crypto-js
import moment from "moment"; // npm install moment
import qs from "qs";
import Order from "../models/order.js";
import { orderController } from "../controllers/index.js";
import OrderDetail from "../models/orderDetail.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

const orderRouter = express.Router();

orderRouter.get("/", orderController.getAllOrder);
orderRouter.put("/:id", orderController.updateOrder);
orderRouter.get("/user/:id", orderController.getListOrderOfUser);
orderRouter.get("/totalpsold", orderController.getTotalProductsSold);
orderRouter.get("/totalamount", orderController.getTotalAmount);
orderRouter.get("/totalamountweekly", orderController.getTotalAmountWeekly);
orderRouter.get("/renenuemonth", orderController.getRevenueByMonth);

orderRouter.get("/top-products", async (req, res) => {
  try {
    const result = await OrderDetail.aggregate([
      {
        $group: {
          _id: "$productId",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $match: { totalQuantity: { $gt: 0 } }, // Lọc sản phẩm có quantity > 0
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 4,
      },
    ])
      

    if (result.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Lấy thông tin chi tiết của các sản phẩm bán chạy nhất
    const topProducts = await Product.find({
      _id: { $in: result.map((item) => item._id) }
    }).populate("brand");

    // Gộp thông tin chi tiết với số lượng sản phẩm đã bán
    const topProductsWithQuantity = topProducts.map((product) => {
      const quantitySold = result.find((item) =>
        item._id.equals(product._id)
      ).totalQuantity;
      const totalPrice = product.option[0].price * quantitySold;
      return {
        ...product.toObject(),
        totalQuantity: quantitySold,
        totalPrice: totalPrice,
      };
    });

    // sắp xếp sản phẩm bán nhiều nhất lên đầu
    topProductsWithQuantity.sort((a, b) => b.totalQuantity - a.totalQuantity);

    return res.status(200).json(topProductsWithQuantity);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error retrieving the top products" });
  }
});

orderRouter.get("/:status", orderController.getOderByStatus);
orderRouter.get("/:id/:status", orderController.getOderByStatusOfUser);
orderRouter.get("/:id", orderController.getOrderById);

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};
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
            version: item.version,
            color: item.color,
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
  } else if (paymentMethod === "zalopay") {
    const embed_data = {
      redirecturl: "http://localhost:3000/",
    };

    const items = listCart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
      app_user: user,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: calculateTotal(listCart),
      description: `Thanh toán cho đơn hàng #${transID}`,
      bank_code: "",
      callback_url: " https://40b1-116-111-119-159.ngrok-free.app/callback",
    };

    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = await axios.post(config.endpoint, null, { params: order });

      return res.status(200).json(result.data);
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: "Lỗi khi tạo đơn hàng qua ZaloPay" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Phương thức thanh toán không hợp lệ" });
  }
});

export default orderRouter;
