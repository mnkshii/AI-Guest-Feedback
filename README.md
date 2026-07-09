# AI Guest Feedback Analyzer

A full-stack MERN application that helps hotel management analyze guest reviews, manage feedback, and securely authenticate users using JWT and Google OAuth.

---
## Features
- Dashboard with review statistics
- Guest Review Management (Create, Read, Update, Delete)
- Search and filter reviews
- AI-ready sentiment analysis module
- Responsive and modern user interface
- Light and Dark Theme support
- User Registration with bcrypt password hashing
- Secure Login using JWT Authentication
- Google OAuth Login
- Protected API Routes
- Protected Frontend Routes
- Logout Functionality
- Forgot Password Page (UI)
- Review Management (CRUD)
- Dashboard Analytics
- Rate Limiting
- Input Validation
- Responsive UI

---

## Tech Stack

### Frontend
- React
- Vite
- CSS
- Lucide React

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas
  
### Authentication
- JWT (jsonwebtoken)
- bcrypt
- Google OAuth (Passport.js)

### Security
- express-rate-limit
- express-validator
- CORS
### Deployment
- Frontend: Vercel
- Backend: Render

---

## Database Choice

This project uses **MongoDB Atlas** because guest reviews are document-based and MongoDB provides a flexible schema, making it ideal for storing review data with varying content.

---

## Database Schema

![Database Schema](images/Schema.png)

---

## Review Schema

| Field | Type |
|-------|------|
| _id | ObjectId |
| guest | String |
| date | Date |
| rating | Number |
| comment | String |
| sentiment | String |
| createdAt | Date |
| updatedAt | Date |

---

## REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/reviews | Get all reviews |
| GET | /api/reviews/:id | Get review by ID |
| GET | /api/reviews/stats | Get dashboard statistics |
| POST | /api/reviews | Create review |
| PUT | /api/reviews/:id | Update review |
| DELETE | /api/reviews/:id | Delete review |

---

## Project Structure

```
AI-Guest-Feedback
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── images
│   └── schema.png
│
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/mnkshii/AI-Guest-Feedback.git
```

Install backend

```bash
cd backend
npm install
```

Run backend

```bash
npm start
```

Install frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## Deployment

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

---
##  Future Enhancements

- AI-powered sentiment analysis using Gemini API
- Automatic management response generation
- Email-based password reset
- User profile management
- Review analytics and charts
- Admin role management
---

## Author

**Meenakshi Pandey**
