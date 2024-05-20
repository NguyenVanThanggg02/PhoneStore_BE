import Configuration from "../models/configuration.js";

const fetchAllConfig = async () => {
  try {
    return await Configuration.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchConfigById = async (id) => {
  try {
    const configId = await Configuration.findOne({ _id: id });
  } catch (error) {}
};

const createConfiguration = async ({
  congNgheManHinh,
  doPhanGiai,
  kichThuocManHinh,
  heDieuHanh,
  viXuLy,
  boNhoTrong,
  ram,
  mangDiDong,
  soKheSim,
}) => {
  try {
    const newConfig = await Configuration.create({
      congNgheManHinh,
      doPhanGiai,
      kichThuocManHinh,
      heDieuHanh,
      viXuLy,
      boNhoTrong,
      ram,
      mangDiDong,
      soKheSim,
    });
    return newConfig;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { fetchAllConfig, createConfiguration };
