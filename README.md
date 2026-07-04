# AI Guest Feedback Analyzer

A full-stack web application that helps hotels analyze guest feedback using sentiment analysis. The application allows users to manage guest reviews, view analytics, and store data permanently using MongoDB Atlas.

---

## Features

- Dashboard with review statistics
- View all guest reviews
- Create new reviews
- Update existing reviews
- Delete reviews
- Sentiment analysis (Positive, Neutral, Negative)
- MongoDB Atlas database integration
- Responsive React frontend
- RESTful Express API
- Cloud deployment using Vercel and Render

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

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Database Choice

This project uses **MongoDB Atlas** because guest reviews are document-based and MongoDB provides a flexible schema, making it ideal for storing review data with varying content.

---

## Database Schema

![Database Schema](images/schema.png)

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

## Author

**Meenakshi Pandey**