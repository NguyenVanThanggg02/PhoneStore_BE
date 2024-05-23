import mongoose, { Schema } from "mongoose";
import { commentSchema } from "./comment.js";
import { categorySchema } from "./categories.js";
import { configurationSchema } from "./configuration.js";
import { brandSchema } from "./brand.js";
const productSchema = new Schema(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: false,
    },
    name: {
      type: String,
      required: [true, "ProductName is required"],
      unique: [true, "Product name is not duplicate"],
    },
    option: [
      {
        color: {
          type: String,
          required: true,
        },
        version: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    categories: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: false,
    },
    configuration: {
      type: Schema.Types.ObjectId,
      ref: "configurations",
      required: true,
    },

    favorite: {
      type: Boolean,
    },

    images: [{ type: String }],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
        require: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);
export default Product;
