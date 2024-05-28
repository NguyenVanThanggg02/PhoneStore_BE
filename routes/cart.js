import express from "express";
import Cart from "../models/cart.js";
import { cartController } from "../controllers/index.js";

const cartRouter = express.Router();
cartRouter.get('/:id',cartController.getListCartOfUser )
cartRouter.delete('/:id',cartController.deleteListCartOfUser)
cartRouter.post('/', cartController.addProductToCart);
cartRouter.put('/:id', cartController.updateCart);
 export default cartRouter