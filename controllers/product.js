import { productDao } from "../dao/index.js";

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productDao.fetchAll();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productDao.fetchProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const removeProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await productDao.deleteProductById(productId);
    if (deleteProduct) {
      res.status(200).json({ message: " Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const getLatestProducts = async (req, res) => {
  try {
    const latestProduct = await productDao.fetchLatestProduct();
    res.status(200).json(latestProduct);
  } catch (error) {
    console.error("Error fetching latest product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getSimilarProducts = async (req, res) => {
  try {
    const similarProduct = req.params.id;
    const product = await productDao.fetchSimilarProduct(similarProduct);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const getProductByBrand = async (req, res) => {
  try {
    const brandId = await productDao.fetchProductByBrand(req.params.id);
    res.status(200).json(brandId);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      brand,
      name,
      option,
      quantity,
      description,
      images,
      configuration,
    } = req.body;

    // Sử dụng hàm createProduct để lưu configuration trước và sau đó tạo sản phẩm
    const newProduct = await productDao.createProduct({
      brand,
      name,
      option,
      quantity,
      description,
      images,
      configuration,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message === "Product name already exists") {
      return res.status(409).json({ message: "Product name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateProduct = await productDao.editProduct(req.params.id, req.body);
    res.status(200).json(updateProduct);
    console.log("Updated product");
  } catch (error) {
    res.status(500).json({ error: "lỗi rồi" });
    console.log(error.message);
  }
};

const getProductByUniqueBrand  = async(req, res) => {
  try {
    const product = await productDao.fetchProductByUniqueBrand(req.params.brand);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
export default {
  getAllProducts,
  getProductById,
  removeProductById,
  getLatestProducts,
  getSimilarProducts,
  getProductByBrand,
  addProduct,
  updateProduct,
  getProductByUniqueBrand
};
