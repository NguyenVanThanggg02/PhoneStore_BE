import Users from "../models/user.js";

const fetAllUser = async () => {
  try {
    return await Users.find({}).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const fetchUserByUsername = async (username) => {
  try {
    return await Users.findOne({ username: username }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};
const fetchUserById = async (id) => {
  try {
    return await Users.findOne({ _id: id }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const createUser = async ({ username, password }) => {
  try {
    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Nếu username không tồn tại, tiếp tục tạo người dùng mới
    const newUser = await Users.create({ username, password });
    return newUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const deleteUser = async (id) => {
  try {
    const deleteUser = await Users.findByIdAndDelete({ _id: id }).exec();
    return deleteUser;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const updateUser = async (username, userData) => {
  try {
    return await Users.findOneAndUpdate({ username: username }, userData, {
      new: true,
    }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const forgotPass = async (email) => {
  try {
    return await Users.findOne({ email: email }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  fetAllUser,
  fetchUserByUsername,
  fetchUserById,
  createUser,
  deleteUser,
  updateUser,
  forgotPass,
};
