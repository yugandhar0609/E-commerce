import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true, // Ensure userName is unique
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true, // Ensure phoneNumber is unique
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensure email is unique
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserDB = mongoose.model("NewUser", userSchema);
export default UserDB;
