import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(), 
    alias: '_id', 
  },
  email: {
    type: String,
    unique: true, 
    required: true, 
  },
  userName: {
    type: String,
    unique: true, 
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

const UserDB = mongoose.model('User', userSchema);
export default UserDB;
