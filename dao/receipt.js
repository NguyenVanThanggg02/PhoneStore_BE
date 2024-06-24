import Receipt from "../models/receipt.js";

const fetChReceiptOfUser = async (id) => {
  try {
    const receipts = await Receipt.find({ userId: id })
      .populate("userId")
      // .populate("productId")
      .populate("cartId")
      .exec();
    return receipts;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default { fetChReceiptOfUser };
