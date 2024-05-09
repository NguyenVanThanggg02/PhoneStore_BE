import { configDao } from "../dao/index.js";

const getAllConfig = async (req, res) => {
  try {
    const allconfig = await configDao.fetchAllConfig();
    res.status(200).json(allconfig);
  } catch (error) {
    res.status(500).json({
        error: error.toString()
    });
  }
};
export default { getAllConfig };
