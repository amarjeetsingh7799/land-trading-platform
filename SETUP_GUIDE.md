# Land Trading Platform - Configuration Guide

## 🔧 Required Setup Steps

### 1. **Google Maps API Setup**

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "Land Trading Platform")
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**

#### Step 2: Create API Key
1. Go to **Credentials** in the left menu
2. Click **Create Credentials** → **API Key**
3. Copy your API Key

#### Step 3: Configure API Key Restrictions
1. Click on your API Key
2. Under **Application Restrictions**, select **HTTP referrers (web sites)**
3. Add your domain(s):
   - For localhost: `http://localhost:3000/*`
   - For production: `https://yourdomain.com/*`
4. Under **API restrictions**, select:
   - Maps JavaScript API
   - Places API
   - Geocoding API
5. Click **Save**

#### Step 4: Update Frontend .env
Edit `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

---

### 2. **Cloudinary Setup (for Image Uploads)**

#### Step 1: Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Go to your **Dashboard**

#### Step 2: Get Your Credentials
Copy these from your Dashboard:
- **Cloud Name** (under "API Environment variable")
- **API Key**
- **API Secret** (scroll down to see it)

#### Step 3: Update Backend .env
Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/land-trading
JWT_SECRET=your_super_secret_key_change_this
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Step 4: Test Image Upload
1. Make sure backend is running: `npm run dev` (in `/backend`)
2. Go to Create Property page
3. Upload an image - it should upload to Cloudinary
4. Image URL should start with `https://res.cloudinary.com/`

---

### 3. **Database Setup (MongoDB)**

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Verify connection
mongo
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/land-trading
```

---

## ✅ Verification Checklist

### Frontend (.env should have):
- [ ] `REACT_APP_API_URL=http://localhost:5000/api`
- [ ] `REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...` (actual key)

### Backend (.env should have):
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=mongodb://...` (actual URI)
- [ ] `JWT_SECRET=your_secret_key`
- [ ] `CLOUDINARY_CLOUD_NAME=your_name`
- [ ] `CLOUDINARY_API_KEY=your_key`
- [ ] `CLOUDINARY_API_SECRET=your_secret`

### Running the Application:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Should see: "Server running on port 5000"
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
# Should see: "App running on http://localhost:3000"
```

---

## 🐛 Troubleshooting

### Google Maps Not Loading
**Error:** "This page can't load Google Maps correctly"

**Solution:**
1. ✅ Check `REACT_APP_GOOGLE_MAPS_API_KEY` is set in `frontend/.env`
2. ✅ Verify API key is valid in Google Cloud Console
3. ✅ Ensure Maps JavaScript API is enabled
4. ✅ Check API key restrictions include your domain
5. ✅ Restart frontend: `npm start`
6. ✅ Clear browser cache (Ctrl+Shift+Delete)

### Images Not Loading (Fallback)
**Error:** Images show placeholder "Image Unavailable"

**Solution:**
1. ✅ Check Cloudinary credentials in `backend/.env`
2. ✅ Verify `CLOUDINARY_CLOUD_NAME` is correct
3. ✅ Test upload on Create Property page
4. ✅ Check browser console (F12) for image URL errors
5. ✅ Ensure MongoDB is running and property data is saved
6. ✅ Images must be uploaded via the form, not manually added

### Properties Not Showing
**Error:** "No properties found" or loading error

**Solution:**
1. ✅ Check MongoDB connection in `backend/.env`
2. ✅ Verify backend is running on port 5000
3. ✅ Check `REACT_APP_API_URL` in frontend matches backend port
4. ✅ Look at backend console for database errors
5. ✅ Create a test property and check if it appears
6. ✅ Check browser console (F12) for API errors

---

## 📝 Environment Variables Summary

### Frontend (`frontend/.env`)
```properties
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyDDwFYaU5iXxjVn8f3X-8y3L9Z2K4R6B8C
```

### Backend (`backend/.env`)
```properties
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/land-trading

# JWT Authentication
JWT_SECRET=your_super_secret_key_change_this_in_production

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Production Deployment

Before deploying to production:

1. **Update `.env` files** with real API keys (not localhost)
2. **Change JWT_SECRET** to a secure random string
3. **Update Google Maps API** restrictions to production domain
4. **Use MongoDB Atlas** instead of local MongoDB
5. **Set `REACT_APP_API_URL`** to your backend domain
6. **Enable HTTPS** for production
7. **Test all features** before deploying

---

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Review error messages in browser console (F12)
3. Check backend logs in terminal
4. Verify all credentials are correct and spelled exactly
5. Restart both backend and frontend servers

---

**Last Updated:** November 13, 2025
