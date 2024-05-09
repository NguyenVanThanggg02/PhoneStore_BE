import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('users', userSchema);
export default Users;