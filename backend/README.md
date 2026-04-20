# CoderWing Backend

Backend API for CoderWing application.

## Folder Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Middleware functions
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── constants/       # Constants
│   └── index.js         # Entry point
├── tests/               # Test files
├── public/              # Static files
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env` file from `.env.example`:
   ```
   cp .env.example .env
   ```

3. Start development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
