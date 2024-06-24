import express from "express";
import { receiptController } from "../controllers/index.js";
const receiptRouter = express.Router();
receiptRouter.get("/:id", receiptController.getReceiptOfUser);
export default receiptRouter;
