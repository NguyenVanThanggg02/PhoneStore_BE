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
    const configId = await Configuration.findOne({_id: id});
    
  } catch (error) {}
};
export default { fetchAllConfig };
