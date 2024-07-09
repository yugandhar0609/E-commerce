import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true, 
    required: true,
  },
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const UserDB = mongoose.model("NewUser", userSchema);
export default UserDB;
