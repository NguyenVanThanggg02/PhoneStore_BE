import mongoose from 'mongoose';

const orderDetailSchema = new mongoose.Schema({
  productId: {
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
  }
});

const OrderItem = mongoose.model('orderDetails', orderDetailSchema);
export default OrderItem;
