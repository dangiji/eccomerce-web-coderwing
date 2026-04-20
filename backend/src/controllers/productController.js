const products = [
  {
    id: '1',
    name: 'Gaming Controller',
    description: 'Comfortable wireless controller with responsive buttons.',
    price: 59.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/360x260?text=Gaming+Controller',
    stock: 25,
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling headphones with long battery life.',
    price: 89.99,
    category: 'Audio',
    image: 'https://via.placeholder.com/360x260?text=Wireless+Headphones',
    stock: 18,
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Track your fitness and receive notifications on the go.',
    price: 139.99,
    category: 'Wearables',
    image: 'https://via.placeholder.com/360x260?text=Smart+Watch',
    stock: 32,
  },
  {
    id: '4',
    name: 'Sneakers',
    description: 'Lightweight, stylish sneakers for everyday wear.',
    price: 69.99,
    category: 'Footwear',
    image: 'https://via.placeholder.com/360x260?text=Sneakers',
    stock: 42,
  },
  {
    id: '5',
    name: 'Portable Speaker',
    description: 'Small speaker with powerful sound for travel and home.',
    price: 49.99,
    category: 'Audio',
    image: 'https://via.placeholder.com/360x260?text=Portable+Speaker',
    stock: 29,
  },
  {
    id: '6',
    name: 'Phone Stand',
    description: 'Adjustable stand for desk and bedside use.',
    price: 14.99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/360x260?text=Phone+Stand',
    stock: 75,
  },
];

const productController = {
  getAllProducts: (req, res) => {
    try {
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: (req, res) => {
    try {
      const { id } = req.params;
      const product = products.find((item) => item.id === id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: (req, res) => {
    try {
      const { name, description, price, category, image, stock } = req.body;
      if (!name || !price || !category) {
        return res.status(400).json({ error: 'Name, price and category are required' });
      }
      const newProduct = {
        id: `${Date.now()}`,
        name,
        description: description || '',
        price,
        category,
        image: image || 'https://via.placeholder.com/360x260?text=New+Product',
        stock: stock || 0,
      };
      products.push(newProduct);
      res.status(201).json({ message: 'Product created', product: newProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: (req, res) => {
    try {
      const { id } = req.params;
      const product = products.find((item) => item.id === id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const { name, description, price, category, image, stock } = req.body;
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.image = image || product.image;
      product.stock = stock || product.stock;
      res.json({ message: 'Product updated', product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: (req, res) => {
    try {
      const { id } = req.params;
      const index = products.findIndex((item) => item.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      products.splice(index, 1);
      res.json({ message: 'Product deleted', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

productController.products = products;
module.exports = productController;
