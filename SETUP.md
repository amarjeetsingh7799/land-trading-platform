# Land Trading Platform - Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)
3. **npm** or **yarn**

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
Create a `.env` file in the `backend` directory with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/land-trading-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development
```

**Important:**
- Replace `MONGODB_URI` with your MongoDB connection string
  - Local MongoDB: `mongodb://localhost:27017/land-trading-platform`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/land-trading-platform`
- Replace `JWT_SECRET` with a strong random string (you can generate one using: `openssl rand -base64 32`)

### 4. Start MongoDB (if using local MongoDB)
```bash
# On Windows
net start MongoDB

# On macOS/Linux
mongod
```

### 5. Start the backend server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server should now be running on `http://localhost:5000`

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5000
```

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file (optional)
Create a `.env` file in the `frontend` directory if you want to change the API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

By default, the frontend will use `http://localhost:5000/api`

### 4. Start the frontend development server
```bash
npm start
```

The frontend should now be running on `http://localhost:3000`

## Troubleshooting

### Backend Issues

#### "MongoDB Connection Error"
- Make sure MongoDB is running
- Check if the MONGODB_URI in .env is correct
- For MongoDB Atlas, make sure your IP is whitelisted

#### "Network Error" or "ECONNREFUSED"
- Make sure the backend server is running on port 5000
- Check if port 5000 is not being used by another application
- Verify the API URL in frontend/src/api.js

#### "JWT_SECRET is not defined"
- Make sure you have created a .env file in the backend directory
- Check if JWT_SECRET is set in the .env file

### Frontend Issues

#### "Failed to load" or "Network Error"
- Make sure the backend server is running
- Check if the backend is accessible at http://localhost:5000
- Open browser console to see detailed error messages
- Check if CORS is properly configured in backend/server.js

#### Registration/Login not working
- Check backend server logs for errors
- Verify MongoDB connection
- Check if JWT_SECRET is set correctly
- Make sure password meets requirements (uppercase, lowercase, number, min 6 characters)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires token)

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (requires authentication)
- `PUT /api/properties/:id` - Update property (requires authentication)
- `DELETE /api/properties/:id` - Delete property (requires authentication)

### Favorites
- `GET /api/favorites` - Get user favorites (requires authentication)
- `POST /api/favorites/:id` - Add to favorites (requires authentication)
- `DELETE /api/favorites/:id` - Remove from favorites (requires authentication)

## Testing the Setup

1. Start the backend server
2. Start the frontend server
3. Open http://localhost:3000 in your browser
4. Try to register a new account
5. Try to browse properties

If everything is working, you should be able to:
- Register and login
- Browse properties
- View property details
- Use all the navigation buttons

## Common Issues and Solutions

### Issue: Backend server won't start
**Solution:** Check if MongoDB is running and the connection string is correct

### Issue: Frontend shows "Failed to load"
**Solution:** 
1. Make sure backend is running on port 5000
2. Check browser console for detailed error
3. Verify API URL in frontend/src/api.js

### Issue: Registration fails with network error
**Solution:**
1. Check if backend server is running
2. Verify MongoDB connection
3. Check backend console for errors
4. Make sure .env file exists with correct values

### Issue: Properties page shows "Failed to load"
**Solution:**
1. Check backend server logs
2. Verify MongoDB has data or the API returns empty array correctly
3. Check browser network tab for API response

## Need Help?

If you're still experiencing issues:
1. Check the browser console for error messages
2. Check the backend server console for error messages
3. Verify all environment variables are set correctly
4. Make sure both frontend and backend servers are running

