import express from "express";
import { userController } from "../controllers/index.js";
const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/login", userController.logInUser);
userRouter.post("/register", userController.registerUser);
userRouter.get("/:username", userController.getUserByUserName);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.removeUser);
userRouter.put("/:username", userController.updateUser);
userRouter.post("/forgot-password", userController.forgetPass);

export default userRouter;
