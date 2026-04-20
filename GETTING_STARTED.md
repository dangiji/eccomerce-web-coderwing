# Getting Started Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## Installation Steps

### 1. Clone or Extract Project
```bash
cd coderwing
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Set DATABASE_URL, PORT, JWT_SECRET, etc.

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## Verification

### Check Backend
Visit: `http://localhost:5000/api/health`

Expected response:
```json
{
  "status": "Backend is running!",
  "timestamp": "2026-04-20T..."
}
```

### Check Frontend
Visit: `http://localhost:3000` in your browser

You should see the CoderWing homepage with navigation.

## Useful Commands

### Backend
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start

# Run tests
npm test
```

### Frontend
```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## Database Setup

### MongoDB Local
```bash
# Start MongoDB service
mongod

# Connect with mongodb://localhost:27017/coderwing
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to backend/.env as DATABASE_URL

## Troubleshooting

### Port Already in Use
```bash
# Backend port change in .env
PORT=5001

# Frontend port change
PORT=3001 npm start
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check DATABASE_URL in .env
- Verify network access if using MongoDB Atlas

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps
1. Read API_DOCUMENTATION.md
2. Check ROADMAP.md for development phases
3. Start implementing features from Phase 2

---

For more details, see README.md in root or individual frontend/backend README.md files.
