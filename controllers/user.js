import { userDao } from "../dao/index.js";

const getAllUsers = async (req, res) => {
  try {
    const allUser = await userDao.fetAllUser();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const logInUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userDao.fetchUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Username is incorrect" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getUserByUserName = async (req, res) => {
  try {
    const username = await userDao.fetchUserByUsername(req.params.username);
    res.status(200).json(username);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = await userDao.fetchUserById(req.params.id);
    res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await userDao.createUser({ username, password });
        res.status(201).json(result)
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(409).json({ message: 'Username already exists' });
        }
        res.status(500).json({ error: error.toString() });
    }
}
const removeUser = async (req, res) => {
    try {
        const deleteUser= await userDao.deleteUser(req.params.id)
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
const updateUser = async (req, res) => {
    try {
        const updateUser = await userDao.updateUser(req.params.username, req.body);
    res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
    
} 
export default { getAllUsers, logInUser, getUserByUserName, getUserById, registerUser,removeUser,updateUser };
