// Order Model
class Order {
  constructor(userId, items, totalPrice, shippingAddress) {
    this.userId = userId;
    this.items = items;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.status = 'pending';
    this.createdAt = new Date();
  }
}

module.exports = Order;
