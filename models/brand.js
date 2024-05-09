import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    hangSanXuat: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("brands", brandSchema);
export default Brand;
export {brandSchema}