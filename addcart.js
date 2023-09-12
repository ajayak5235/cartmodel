const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// Add a product to the user's cart
router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      // If the product already exists, update the quantity
      existingItem.quantity += quantity || 1;
    } else {
      // If not, add a new item to the cart
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    // Save the cart
    await cart.save();

    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
