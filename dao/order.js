import moment from "moment";
import Order from "../models/order.js";
import OrderDetail from "../models/orderDetail.js";

const fetchAllOrder = async () => {
  try {
    const AllOrder = await Order.find({})
      .populate("userId")
      .populate({
        path: "items",
        populate: {
          path: "productId",
          model: "products",
        },
      })
      .exec();
    return AllOrder;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const fetchListOrderOfUser = async (id) => {
  try {
    const orders = await Order.find({ userId: id })
      .populate({
        path: "items",
        populate: {
          path: "productId",
          model: "products",
        },
      })
      .exec();
    return orders;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const updateOrder = async (id, orDerData) => {
  try {
    const updateOrder = await Order.findOneAndUpdate({ _id: id }, orDerData, {
      new: true,
    }).exec();
    return updateOrder;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchOrderById = async (id) => {
  try {
    const orderById = await Order.find({ _id: id })
      .populate({
        path: "items",
        populate: {
          path: "productId",
          model: "products",
        },
      })
      .exec();
    return orderById;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchOrderByStatus = async (status) => {
  try {
    const orderByStatus = await Order.find({ status: status })
      .populate("userId")
      .populate({
        path: "items",
        populate: {
          path: "productId",
          model: "products",
        },
      })
      .exec();
    return orderByStatus;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchOrderByStatusOfUser = async (id, status) => {
  try {
    const orderByStatusOfUser = await Order.find({ userId: id, status: status })
      .populate({
        path: "items",
        populate: {
          path: "productId",
          model: "products",
        },
      })
      .populate("userId")
      .exec();
    return orderByStatusOfUser;
  } catch (error) {}
};
const fetchTotalProductsSold = async () => {
  try {
    const totalProducts = await OrderDetail.find();
    const productsSold = totalProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return productsSold;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const fetchTotalRevenue = async () => {
  try {
    const totalRevenue = await OrderDetail.find();
    const revenue = totalRevenue.reduce((total, item) => total + item.price, 0);
    return revenue;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchTotalRevenueWeekly = async () => {
  try {
    const currentDate = new Date();
    const weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const totalRevenueOneWeek = await OrderDetail.find({
      createdAt: { $gte: weekAgo, $lt: currentDate },
    });

    const totalAmountWeek = totalRevenueOneWeek.reduce(
      (total, item) => total + item.price,
      0
    );
    return totalAmountWeek;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchRevenueByMonth = async () => {
  try {
    const revenue = await OrderDetail.find();
    const revenueByMonth = revenue.reduce((total, item) => {
      const month = moment(item.createdAt).format("MM");
      if (!total[month]) {
        total[month] = 0;
      }
      total[month] += item.price;
      return total;
    }, {});
    return revenueByMonth;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  updateOrder,
  fetchListOrderOfUser,
  fetchOrderById,
  fetchAllOrder,
  fetchOrderByStatus,
  fetchOrderByStatusOfUser,
  fetchTotalProductsSold,
  fetchTotalRevenue,
  fetchTotalRevenueWeekly,
  fetchRevenueByMonth,
};
