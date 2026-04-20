import axiosInstance from './axiosInstance';

// Auth API calls
export const loginUser = (email, password) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const signupUser = (userData) => {
  return axiosInstance.post('/auth/signup', userData);
};

// Product API calls
export const getProducts = () => {
  return axiosInstance.get('/products');
};

export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

// Cart API calls
export const getCart = () => {
  return axiosInstance.get('/cart');
};

export const addToCart = (productId, quantity) => {
  return axiosInstance.post('/cart/add', { productId, quantity });
};

export const removeFromCart = (productId) => {
  return axiosInstance.delete(`/cart/remove/${productId}`);
};

export const clearCart = () => {
  return axiosInstance.delete('/cart/clear');
};

// Order API calls
export const createOrder = (orderData) => {
  return axiosInstance.post('/orders', orderData);
};

export const getOrders = () => {
  return axiosInstance.get('/orders');
};
