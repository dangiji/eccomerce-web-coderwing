# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": { ... }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "Logout successful"
}
```

---

## Product Endpoints

### Get All Products
```
GET /products?page=1&limit=10

Response: 200 OK
[
  {
    "_id": "...",
    "name": "Product Name",
    "price": 99.99,
    "category": "Electronics",
    "description": "...",
    "stock": 10
  }
]
```

### Get Product by ID
```
GET /products/:productId

Response: 200 OK
{
  "_id": "...",
  "name": "Product Name",
  "price": 99.99,
  ...
}
```

### Create Product
```
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100
}

Response: 201 Created
```

---

## Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer {token}

Response: 200 OK
{
  "items": [...],
  "totalPrice": 299.97
}
```

### Add to Cart
```
POST /cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "...",
  "quantity": 2
}

Response: 200 OK
```

### Remove from Cart
```
DELETE /cart/remove/:productId
Authorization: Bearer {token}

Response: 200 OK
```

---

## Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "paymentMethod": "credit_card"
}

Response: 201 Created
```

### Get Orders
```
GET /orders
Authorization: Bearer {token}

Response: 200 OK
[...]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token or authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong"
}
```
