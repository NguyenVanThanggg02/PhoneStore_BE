import mongoose, { Schema } from "mongoose";

const configurationSchema = new Schema({
  congNgheManHinh: {
    type: String,
    required: true,
  },
  doPhanGiai: {
    type: String,
    required: true,
  },
  kichThuocManHinh: {
    type: String,
    required: true,
  },
  heDieuHanh: {
    type: String,
    required: true,
  },
  viXuLy: {
    type: String,
    required: true,
  },
  boNhoTrong: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  mangDiDong: {
    type: String,
    required: true,
  },
  soKheSim: {
    type: Number,
    required: true,
  }
});

const Configuration = mongoose.model('configurations', configurationSchema);

export default Configuration;
export {configurationSchema}