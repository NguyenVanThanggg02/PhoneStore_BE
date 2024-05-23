import Configuration from "../models/configuration.js";
import Product from "../models/product.js";

const fetchAll = async () => {
  try {
    return await Product.find({})
      .populate("comments")
      .populate("brand")
      .populate("configuration")
      .exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchProductById = async (id) => {
  try {
    const productId = await Product.findOne({ _id: id })
      .populate("configuration")
      .populate("brand")
      .populate("comments")
      .exec();
    return productId._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const deleteProductById = async (id) => {
  try {
    const deleteProductById = await Product.deleteOne({ _id: id })
      .populate("configurations")
      .exec();
    return deleteProductById;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchLatestProduct = async () => {
  try {
    return await Product.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("brand")
      .exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchSimilarProduct = async (id) => {
  try {
    const productId = await Product.find({ brand: id })
      .populate("configuration")
      .populate("brand")
      .populate("comments")
      .exec();
    return productId;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchProductByBrand = async (id) => {
  try {
    const brandId = await Product.find({ brand: id })
      .populate("configuration")
      .populate("brand")
      .populate("comments")
      .exec();
    return brandId;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const createProduct = async ({
  brand,
  name,
  option,
  quantity,
  description,
  images,
  configuration,
}) => {
  try {
    const existingProductName = await Product.findOne({ name });
    if (existingProductName) {
      console.log("Product name already exists");
    }
    // Tạo và lưu cấu hình mới
    const newConfiguration = await Configuration.create(configuration);
    // await newConfiguration.save();

    // Sử dụng _id của cấu hình mới tạo để tạo sản phẩm
    const newProduct = await Product.create({
      brand,
      name,
      option,
      quantity,
      description,
      images,
      configuration: newConfiguration._id, // Tham chiếu đến _id của cấu hình
    });

    return newProduct;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const editProduct = async (id, productData) => {
  try {
    return await Product.findOneAndUpdate({ _id: id }, productData, {
      new: true,
    }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  fetchAll,
  fetchProductById,
  deleteProductById,
  fetchLatestProduct,
  fetchSimilarProduct,
  fetchProductByBrand,
  createProduct,
  editProduct,
};
