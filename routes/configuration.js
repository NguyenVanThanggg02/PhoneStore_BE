import express from "express";
import { configController } from "../controllers/index.js";
const configRouter = express.Router();

configRouter.get("/", configController.getAllConfig);

export default configRouter;
