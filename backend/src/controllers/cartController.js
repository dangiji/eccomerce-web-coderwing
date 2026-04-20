const productController = require('./productController');

const carts = {};

const cartController = {
  getCart: (req, res) => {
    try {
      const userId = req.user.userId;
      const cart = carts[userId] || { items: [] };
      const detailedItems = cart.items.map((item) => {
        const product = productController.products.find((prod) => prod.id === item.productId);
        const productData = product || item.product;
        return {
          productId: item.productId,
          name: productData?.name || item.name,
          price: productData?.price || item.price,
          image: productData?.image || item.image,
          quantity: item.quantity,
          total: ((productData?.price || item.price) * item.quantity).toFixed(2),
        };
      });
      const totalPrice = detailedItems.reduce((sum, item) => sum + Number(item.total), 0);
      res.json({ items: detailedItems, totalPrice });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addToCart: (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.userId;

      if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
      }

      const product = productController.products.find((item) => item.id === productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      carts[userId] = carts[userId] || { items: [] };
      const existingItem = carts[userId].items.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        carts[userId].items.push({ productId, quantity: Number(quantity), product });
      }

      res.json({ message: 'Item added to cart', cart: carts[userId] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeFromCart: (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.userId;
      const cart = carts[userId] || { items: [] };
      carts[userId].items = cart.items.filter((item) => item.productId !== productId);
      res.json({ message: 'Item removed from cart', cart: carts[userId] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  clearCart: (req, res) => {
    try {
      const userId = req.user.userId;
      carts[userId] = { items: [] };
      res.json({ message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = cartController;
