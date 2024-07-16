import CartModels from '../Models/CartModels.js';


// Get user's cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await CartModels.findOne({ user: userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity, name, price, image } = req.body;

    let cart = await CartModels.findOne({ user: userId });
    if (!cart) {
      cart = new CartModels({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        name,
        price,
        image,
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;

    let cart = await CartModels.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
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
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
