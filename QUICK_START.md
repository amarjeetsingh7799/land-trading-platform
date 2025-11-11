# Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### Step 1: Start MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux  
mongod
```

### Step 2: Setup Backend
```bash
cd backend
npm install

# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/land-trading-platform
# JWT_SECRET=your-secret-key-here
# PORT=5000

npm run dev
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install
npm start
```

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server is running on http://localhost:5000
- [ ] Frontend server is running on http://localhost:3000
- [ ] Backend shows "✅ MongoDB Connected Successfully"
- [ ] No errors in browser console
- [ ] Can access http://localhost:3000

## 🐛 Common Issues

### "Network Error" when registering
**Fix:** Make sure backend server is running on port 5000

### "Failed to load" on properties page
**Fix:** 
1. Check backend is running
2. Check MongoDB connection
3. Backend should return `{success: true, items: [], total: 0}` even with no properties

### MongoDB Connection Error
**Fix:** 
1. Start MongoDB service
2. Check MONGODB_URI in backend/.env
3. For MongoDB Atlas, check IP whitelist

## 📝 Test the Setup

1. Open http://localhost:3000
2. Click "Sign up"
3. Register with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123 (must have uppercase, lowercase, number)
   - Role: Buyer
4. Should redirect to home page
5. Click "Browse properties" or any category button
6. Should show properties page (even if empty)

## 🎯 Expected Behavior

- ✅ Registration works without network errors
- ✅ Login works
- ✅ Properties page loads (shows "No properties found" if empty)
- ✅ All buttons navigate correctly
- ✅ No "Failed to load" errors

## 📞 Need Help?

Check the full SETUP.md file for detailed instructions.

