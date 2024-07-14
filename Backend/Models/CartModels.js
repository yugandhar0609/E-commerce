import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewUser', // Referencing the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencing a Product model (if applicable)
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
