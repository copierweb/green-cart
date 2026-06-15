# 🥬 Green-Cart – Grocery Delivery Web App (MERN Stack)

Green-Cart is a full-stack grocery delivery web application built using the MERN stack. It allows users to browse grocery products, add items to their cart, and place orders. The platform also includes a seller dashboard where the owner can manage products, pricing, offers, and product visibility.

---

## 🚀 Features

### 👤 User Features
- Browse grocery products
- View product details with multiple images
- Add/remove items from cart
- Place orders
- User authentication (Sign up / Login)
- View order history

### 🛒 Seller Dashboard Features
- Secure seller login system
- Add new grocery products
- Upload multiple product images
- Manage product prices and offers
- Hide/unhide products from users
- Edit and update product details

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- React Router DOM (routing)
- Context API + useReducer (state management)
- Tailwind CSS (styling)
- Toast notifications (user feedback system)

### Backend
- Node.js
- Express.js
- RESTful API architecture

### Database
- MongoDB
- Mongoose (ODM)

### Cloud Services
- Cloudinary (image storage for product images)

---

## 📦 Project Structure (Overview)
## Project Structure

```txt
client/   -> Frontend (React + Tailwind CSS)
server/   -> Backend (Node.js + Express + MongoDB)
```

## Run the Application

### Start Backend Server

```bash id="i9hdb0"
cd server
npm start
```

### Start Frontend

```bash id="e6q0mr"
cd client
npm run dev
```
---


---

## ⚙️ Environment Variables

### 🌐 Frontend (.env)

Create a `.env` file inside the `client` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
---
### 🔧 Backend (.env)
Create a config.env file inside the server folder:
NODE_ENV=development
PORT=5000

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000

# Admin / Seller Credentials
SELLER_EMAIL="admin@example.com"
SELLER_PASSWORD="admin@123"

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database Configuration
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_password
MONGO_DB=your_database_name
MONGO_CLUSTER=your_cluster_name

MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>/<DB>

# Authentication
JWT-based authentication for users and seller
Protected routes for dashboard and orders

# Image Upload
Product images uploaded to Cloudinary
Image URLs stored in MongoDB




