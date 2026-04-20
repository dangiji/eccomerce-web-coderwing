// Application Constants
module.exports = {
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  },
  
  ORDER_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },

  PRODUCT_CATEGORIES: [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Other'
  ],

  PAYMENT_METHODS: [
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Bank Transfer'
  ]
};
