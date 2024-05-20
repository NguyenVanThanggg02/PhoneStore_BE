import { configDao } from "../dao/index.js";

const getAllConfig = async (req, res) => {
  try {
    const allconfig = await configDao.fetchAllConfig();
    res.status(200).json(allconfig);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

const addConfiguration = async (req, res) => {
  try {
    const {
      congNgheManHinh,
      doPhanGiai,
      kichThuocManHinh,
      heDieuHanh,
      viXuLy,
      boNhoTrong,
      ram,
      mangDiDong,
      soKheSim,
    } = req.body;
    const newConfig = await configDao.createConfiguration({
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
    res.status(200).json(newConfig);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};
export default { getAllConfig, addConfiguration };
