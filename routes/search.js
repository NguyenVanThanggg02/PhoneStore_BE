import express from "express";
import Product from "../models/product.js";
const searchRouter = express.Router();

searchRouter.get("/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(name);

    const searchResult = await Product.find({
      name: { $regex: searchRgx, $options: "i" },
    })
      .populate("configuration")
      .populate("brand")
      .populate("comments");
    res.send(searchResult);
  } catch (error) {
    throw new Error(error.toString());
  }
});

export default searchRouter;
