import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true, 
        required: true,
      },
    name: {
        type: String, 
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    new_price: {
        type: Number, 
        required: true,
      },
      old_price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const AdminDB = mongoose.model("NewProduct",adminSchema)

export default AdminDB;