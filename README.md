# CoderWing E-Commerce Platform

A complete full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Project Overview

This project implements an e-commerce platform with the following pages and features:

### Frontend Pages
- **Home Page** - Product showcase and featured items
- **Login/Register** - User authentication
- **Product Listing** - Browse all products with filtering
- **Product Details** - Detailed product information
- **Shopping Cart** - Manage cart items
- **Checkout** - Complete purchase flow
- **User Account** - Profile and order history
- **Wishlist** - Save favorite products
- **About Us** - Company information
- **Contact Us** - Customer support
- **404 Error** - Not found page

### Backend API Endpoints

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:productId` - Remove item
- `DELETE /api/cart/clear` - Clear cart

#### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

#### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## Project Structure

```
coderwing/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── product/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── services/
    │   ├── utils/
    │   ├── constants/
    │   └── index.js
    ├── tests/
    ├── public/
    ├── package.json
    ├── .env.example
    └── README.md
```

## Installation & Setup

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/coderwing
JWT_SECRET=your_jwt_secret_key
```

### Frontend Configuration
Set API URL in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features to Implement

- [ ] Database models and schemas
- [ ] User authentication with JWT
- [ ] Password encryption with bcryptjs
- [ ] Product management
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product search and filtering
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Unit and integration tests

## Contribution Guidelines

1. Create feature branches
2. Write clean, documented code
3. Follow project structure conventions
4. Test changes before submitting

## License

MIT License

---

**Status**: Development in Progress 🚀
