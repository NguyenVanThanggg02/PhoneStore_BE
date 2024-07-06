import { orderDao } from "../dao/index.js";

const getAllOrder = async (req, res) => {
  try {
    const AllOrder = await orderDao.fetchAllOrder();
    res.status(200).json(AllOrder);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getListOrderOfUser = async (req, res) => {
  try {
    const orderByUserId = req.params.id;
    const orderList = await orderDao.fetchListOrderOfUser(orderByUserId);
    if (orderList) {
      res.status(200).json(orderList);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateOrder = await orderDao.updateOrder(req.params.id, req.body);
    res.status(200).json(updateOrder);
    console.log("Updated order successfully");
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    console.log("Failed to order product");
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderBId = await orderDao.fetchOrderById(orderId);
    if (orderBId) {
      res.status(200).json(orderBId);
    } else {
      res.status(404).json("not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const getOderByStatus = async (req, res) => {
  try {
    const oderstatus = await orderDao.fetchOrderByStatus(req.params.status);
    if (oderstatus) {
      res.status(200).json(oderstatus);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const getOderByStatusOfUser = async (req, res) => {
  try {
    const oderstatusOfUser = await orderDao.fetchOrderByStatusOfUser(
      req.params.id,
      req.params.status
    );
    if (oderstatusOfUser) {
      res.status(200).json(oderstatusOfUser);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const getTotalProductsSold = async (req, res) => {
  try {
    const productsSold = await orderDao.fetchTotalProductsSold();
    res.status(200).json({ productsSold });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const getTotalAmount = async (req, res) => {
  try {
    const amount = await orderDao.fetchTotalRevenue();
    res.status(200).json({ amount });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const getTotalAmountWeekly = async (req, res) => {
  try {
    const totalAmountWeek = await orderDao.fetchTotalRevenueWeekly();
    res.status(200).json({ totalAmountWeek });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const getRevenueByMonth = async (req, res) => {
  try {
    const revenueByMonth = await orderDao.fetchRevenueByMonth();
    // Tạo  mảng chứa  tháng từ 1 - 12 sau đó sắp xếp
    const sortedMonthlyRevenue = Array.from({ length: 12 }, (_, i) => {
      const month = String(i + 1).padStart(2, "0"); // Định dạng tháng '01', '02'
      return {
        month,
        //monthlyRevenue[month] || 0 đảm bảo rằng nếu một tháng không có dữ liệu doanh thu,
        //giá trị mặc định sẽ là 0.
        revenue: revenueByMonth[month] || 0,
      };
    });

    return res.status(200).json(sortedMonthlyRevenue);
  } catch (error) {}
};

export default {
  updateOrder,
  getListOrderOfUser,
  getOrderById,
  getAllOrder,
  getOderByStatus,
  getOderByStatusOfUser,
  getTotalProductsSold,
  getTotalAmount,
  getTotalAmountWeekly,
  getRevenueByMonth,
};
