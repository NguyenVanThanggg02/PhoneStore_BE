import express from "express";
import { userController } from "../controllers/index.js";
import Users from "../models/user.js";
const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/login", userController.logInUser);
userRouter.post("/register", userController.registerUser);
userRouter.get("/:username", userController.getUserByUserName);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.removeUser);
userRouter.put("/:username", userController.updateUser);
userRouter.post("/forgot-password", userController.forgetPass);



userRouter.post("/reset-password/:id", (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
  
    Users.findById(id).then((user) => {
      if (!user) {
        return res.send({ Status: "User not found" });
      }
  
      // Cập nhật mật khẩu mới cho người dùng
      user.password = password;
      user
        .save()
        .then(() => res.send({ Status: "Success" }))
        .catch((err) =>
          res.send({ Status: "Error updating password", Error: err })
        );
    });
  });

export default userRouter;
