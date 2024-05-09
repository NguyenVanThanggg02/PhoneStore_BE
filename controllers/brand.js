import { brandDao } from "../dao/index.js";

const getAllBrands = async (req, res) => {
  try {
    const allBrands = await brandDao.fetchAll();
    res.status(200).json(allBrands);
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

export default {getAllBrands}
