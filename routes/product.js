import express from 'express';
import { productController } from '../controllers/index.js';
const productRouter = express.Router();

productRouter.get('/',productController.getAllProducts);
productRouter.get('/latest', productController.getLatestProducts);

productRouter.get('/:id',productController.getProductById);
productRouter.delete('/:id',productController.removeProductById);
productRouter.get('/brand/:id',productController.getSimilarProducts);
productRouter.get('/bybrand/:id',productController.getProductByBrand);

export default productRouter