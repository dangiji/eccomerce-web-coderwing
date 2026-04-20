// Product Model
class Product {
  constructor(name, description, price, category, image, stock) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
    this.stock = stock;
    this.createdAt = new Date();
  }
}

module.exports = Product;
