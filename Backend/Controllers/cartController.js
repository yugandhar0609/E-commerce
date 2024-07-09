// Controllers/cartController.js
import Cart from "../Models/UserModels.js"
import Product from "../Models/ProductModel.js";

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart.items);
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json(cart.items);
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(404).json({ message: "Product not in cart" });
    }

    await cart.save();
    res.status(200).json(cart.items);
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};
