// Retrieve the user's cart
router.get('/get-cart/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.json({ cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  