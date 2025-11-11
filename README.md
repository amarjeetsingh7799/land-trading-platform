text
# 🏡 Land Trading Platform

A modern, full-stack real estate marketplace for buying, selling, and renting properties across Delhi NCR. Built with the MERN stack featuring real-time chat, Google Maps integration, Google OAuth authentication, and advanced property management.

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white)

## ✨ Key Features

### 🔐 Advanced Authentication
- JWT-based authentication with secure token management
- Google OAuth integration for social login
- bcrypt password hashing for security
- Protected routes and role-based access control
- Session management with automatic token refresh

### 💬 Real-time Chat System
- Socket.IO integration for instant messaging
- Live chat with property sellers
- Real-time notifications for new messages
- Chat history persistence in MongoDB
- Online/offline status indicators

### 🗺️ Google Maps Integration
- Interactive property location maps
- Geocoding for address lookup
- Distance calculation from user location
- Area-based search with map boundaries
- Location markers for all properties

### 🏠 Property Management
- Smart property search by location, price, and type
- Multiple categories: Plots, Rentals, Commercial spaces
- Advanced filtering with multiple parameters
- Image gallery with AI-generated property images
- Detailed property information pages

### 👤 User Features
- Profile management with photo upload
- Favorites/Wishlist functionality
- Property listing management for sellers
- User dashboard with analytics
- Settings and preferences

## 🛠️ Tech Stack

### Frontend
- React.js with Vite for blazing-fast development
- Tailwind CSS for modern, responsive UI
- React Router v6 for navigation
- Axios for API requests
- Socket.IO Client for real-time features
- Google Maps API for location services
- React Context API for state management

### Backend
- Node.js & Express.js RESTful API
- MongoDB with Mongoose ODM
- Socket.IO for WebSocket connections
- JWT (JSON Web Tokens) for authentication
- Passport.js for Google OAuth
- bcrypt for password encryption
- Multer for file uploads
- dotenv for environment configuration
- CORS for cross-origin requests

### Additional Technologies
- Google Maps JavaScript API
- Google OAuth 2.0
- WebSocket protocol via Socket.IO
- RESTful API architecture
- MongoDB Atlas for cloud database

## 📸 Screenshots

_Coming soon - Application screenshots_

## 🚀 Quick Start Guide

### Prerequisites

Make sure you have installed:
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- MongoDB - [Download](https://www.mongodb.com/try/download/community)
- Git - [Download](https://git-scm.com/)

You'll also need:
- Google Maps API Key - [Get it here](https://console.cloud.google.com/)
- Google OAuth credentials - [Setup guide](https://developers.google.com/identity/protocols/oauth2)

### Installation Steps

1. **Clone the repository**
git clone https://github.com/amarjeetsingh7799/land-trading-platform.git
cd land-trading-platform

text

2. **Set up Backend**
cd backend
npm install

text
Create a `.env` file in the `backend` folder:
Database
MONGODB_URI=mongodb://localhost:27017/land-trading

Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Server
PORT=5000
NODE_ENV=development

Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173

text

3. **Set up Frontend**
cd ../frontend
npm install

text
Create a `.env` file in the `frontend` folder:
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id

text

4. **Start MongoDB**
Make sure MongoDB is running:
mongod

text

5. **Run the Application**

Open two terminal windows:

Terminal 1 (Backend):
cd backend
npm run dev

text

Terminal 2 (Frontend):
cd frontend
npm run dev

text

6. **Access the Application**
 - Frontend: http://localhost:5173
 - Backend API: http://localhost:5000
 - Socket.IO: ws://localhost:5000

## 📁 Project Structure

land-trading-platform/
├── backend/
│ ├── models/
│ │ ├── User.js # User schema with OAuth
│ │ ├── Property.js # Property schema
│ │ ├── Chat.js # Chat/Message schema
│ │ └── Favorite.js # User favorites
│ ├── routes/
│ │ ├── auth.js # Auth routes (JWT + Google OAuth)
│ │ ├── property.js # Property CRUD routes
│ │ ├── chat.js # Chat routes
│ │ └── user.js # User profile routes
│ ├── controllers/
│ │ ├── authController.js # Authentication logic
│ │ ├── propertyController.js
│ │ ├── chatController.js
│ │ └── userController.js
│ ├── middleware/
│ │ ├── auth.js # JWT verification
│ │ ├── upload.js # Multer file upload
│ │ └── errorHandler.js
│ ├── config/
│ │ ├── db.js # MongoDB connection
│ │ ├── passport.js # Passport Google OAuth
│ │ └── socket.js # Socket.IO configuration
│ ├── utils/
│ │ ├── geocoding.js # Google Maps geocoding
│ │ └── tokenUtils.js # JWT utilities
│ ├── sockets/
│ │ └── chatHandler.js # Socket.IO chat events
│ └── server.js # Entry point
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Auth/ # Login, Register components
│ │ │ ├── Property/ # Property cards, listings
│ │ │ ├── Chat/ # Chat interface
│ │ │ ├── Maps/ # Google Maps components
│ │ │ └── Common/ # Shared components
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── PropertyDetails.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── Chat.jsx
│ │ │ └── Search.jsx
│ │ ├── context/
│ │ │ ├── AuthContext.jsx # Auth state management
│ │ │ ├── SocketContext.jsx # Socket.IO context
│ │ │ └── MapContext.jsx # Maps state
│ │ ├── hooks/
│ │ │ ├── useAuth.js
│ │ │ ├── useSocket.js
│ │ │ └── useGeolocation.js
│ │ ├── services/
│ │ │ ├── api.js # Axios instance
│ │ │ ├── socket.js # Socket.IO client
│ │ │ └── maps.js # Google Maps API
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── public/
└── README.md

text

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` — Register with email/password
- `POST /api/auth/login` — Login with credentials
- `GET /api/auth/google` — Initiate Google OAuth
- `GET /api/auth/google/callback` — Google OAuth callback
- `GET /api/auth/profile` — Get current user profile
- `POST /api/auth/logout` — Logout user

### Properties
- `GET /api/properties` — Get all properties (with filters)
- `GET /api/properties/:id` — Get single property
- `POST /api/properties` — Create new property (auth required)
- `PUT /api/properties/:id` — Update property (auth required)
- `DELETE /api/properties/:id` — Delete property (auth required)
- `GET /api/properties/nearby` — Get properties near location

### Chat (Socket.IO Events)
- `join_room` — Join property chat room
- `send_message` — Send message to seller
- `receive_message` — Receive new message
- `typing` — Typing indicator
- `user_online` — User online status

### User
- `GET /api/user/profile` — Get user profile
- `PUT /api/user/profile` — Update profile
- `POST /api/user/favorites/:propertyId` — Add to favorites
- `GET /api/user/favorites` — Get user favorites

## 💡 Usage

### For Buyers
1. Register/Login with email or Google account
2. Browse Properties with map view or list view
3. Use filters to find properties by location, price, type
4. View on map to see exact locations
5. Chat with sellers in real-time
6. Save favorites for later viewing
7. Contact sellers through integrated chat

### For Sellers
1. Create account and complete profile
2. Add property listings with photos and details
3. Pin locations on Google Maps
4. Manage listings from your dashboard
5. Respond to buyers via real-time chat
6. Track property views and interest

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Video tours for properties
- [ ] Advanced filters (bedrooms, amenities, nearby facilities)
- [ ] Property comparison tool
- [ ] Email/SMS notifications for new listings
- [ ] Property verification system with admin approval
- [ ] Mobile app (React Native)
- [ ] Virtual property tours with 360° images
- [ ] Mortgage calculator integration
- [ ] Property analytics dashboard

## 🔒 Security Features

- JWT token-based authentication
- Password encryption with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints
- Secure WebSocket connections
- OAuth 2.0 implementation

## 🐛 Known Issues

Currently tracking issues in the [Issues tab](https://github.com/amarjeetsingh7799/land-trading-platform/issues).

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Amarjeet Singh**
- GitHub: [@amarjeetsingh7799](https://github.com/amarjeetsingh7799)
- Location: Bihar, India
- Education: B.Tech Computer Science Engineering (3rd Year)
- Skills: Full-Stack Development, MERN Stack, Real-time Applications

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

## 🙏 Acknowledgments

- MERN stack community
- Socket.IO documentation
- Google Maps Platform
- Modern real estate platforms for inspiration
- Built as part of B.Tech CSE portfolio project

## 📊 Project Stats

- Languages: JavaScript, HTML, CSS
- Frameworks: React, Express, Node.js
- Database: MongoDB
- Real-time: Socket.IO
- APIs: Google Maps, Google OAuth

## ⭐ Show Your Support

If you find this project helpful or interesting, please give it a ⭐️!

---

**Made with ❤️ by Amarjeet Singh | Full-Stack MERN Developer**
