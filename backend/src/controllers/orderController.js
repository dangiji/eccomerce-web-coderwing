const orders = [];

const orderController = {
  createOrder: (req, res) => {
    try {
      const userId = req.user?.userId || req.user?.id;
      const { items, shippingInfo, paymentMethod, totalAmount } = req.body;

      if (!items || !items.length) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      if (!shippingInfo || !shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.country) {
        return res.status(400).json({ error: 'Complete shipping information is required' });
      }

      const order = {
        id: `${Date.now()}`,
        userId,
        items,
        shippingInfo,
        paymentMethod: paymentMethod || 'Credit Card',
        totalAmount: Number(totalAmount) || items.reduce((sum, item) => sum + Number(item.total || item.price * item.quantity), 0),
        status: 'Pending',
        createdAt: new Date(),
      };

      orders.push(order);
      res.status(201).json({ message: 'Order created', order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrders: (req, res) => {
    try {
      const userId = req.user?.userId || req.user?.id;
      const userOrders = orders.filter((order) => order.userId === userId);
      res.json({ orders: userOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: (req, res) => {
    try {
      const userId = req.user?.userId || req.user?.id;
      const { id } = req.params;
      const order = orders.find((entry) => entry.id === id && entry.userId === userId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
