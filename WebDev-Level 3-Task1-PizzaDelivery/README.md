# Pizza Delivery Full-Stack Platform

A production-quality full-stack Pizza Delivery and Inventory Management Platform built for OIBSIP Internship Task 1.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS v4, React Router v6
- **Backend**: Node.js, Express.js, JWT, bcryptjs
- **Database**: MongoDB & Mongoose
- **Email**: Nodemailer + node-cron
- **Payments**: Razorpay (Test Mode)

## Features
### User Features
- JWT Authentication, Registration, Login
- Email Verification and Forgot/Reset Password
- Custom Pizza Builder (Base, Sauce, Cheese, Veggies)
- Dynamic pricing & Cart Summary
- Razorpay Payment Integration (Test Mode)
- Real-time / Polling Order Tracking

### Admin Features
- Separate Admin Login
- Inventory Management with stock updates
- Automated low-stock email alerts (Cron Job)
- Order status management (Order Received -> In Kitchen -> Sent to Delivery -> Delivered)
- Automatic inventory decrement on successful payment

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally, or an Atlas URI.

### 1. Backend Setup
1. `cd server`
2. `npm install`
3. Configure your `.env` variables inside the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/pizza-delivery
   JWT_SECRET=yoursecret
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_KEY_SECRET=your_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ADMIN_EMAIL=admin@example.com
   ```
4. Seed the database with the initial Admin and Inventory:
   ```bash
   node seed.js
   ```
   *Note: This creates an admin account with email `admin@pizzadev.com` and password `password123`.*
5. Run the server: `npm run dev`

### 2. Frontend Setup
1. `cd client`
2. `npm install`
3. Start the Vite React app: `npm run dev`
4. Access the site at `http://localhost:5173`

## Development Notes
- The Razorpay functionality is implemented in test mode. Do not use real credentials or credit cards.
- The inventory decrements automatically upon successful payment verification.
- The node-cron job checks the inventory every hour and sends an email if stock is below the threshold.
