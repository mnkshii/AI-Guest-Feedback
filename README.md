# AI Guest Feedback Dashboard

An AI-powered web application that analyzes guest reviews, classifies sentiment, identifies key themes, and generates management responses.

**Current Status:** Full-stack REST API with Express (in-memory data) connected to a React frontend, tested via Postman.

**Future Enhancements:** MongoDB, JWT Authentication, and Google Gemini AI integration.

---

## ✨ Features

### Dashboard

* Overview of total reviews
* Sentiment breakdown (positive, neutral, negative)
* Average rating statistics

### Review Management

* Create reviews
* View reviews
* Update reviews
* Delete reviews

### Search

* Find reviews by guest name or comment content

### Statistics

* Total reviews
* Sentiment counts
* Average rating

### AI Analysis (Coming Soon)

* Sentiment analysis using Gemini AI
* Automated management response generation

### UI Features

* Light/Dark Theme Toggle
* Responsive Design (Desktop & Mobile)

---

## 🧰 Tech Stack

| Layer          | Technology                                            |
| -------------- | ----------------------------------------------------- |
| Frontend       | React 18, Vite, React Router, FontAwesome, Custom CSS |
| Backend        | Node.js, Express, CORS, dotenv                        |
| Data           | In-memory Array (MongoDB planned for Week 5)          |
| Testing        | Postman                                               |
| Authentication | JWT (Planned)                                         |
| AI             | Google Gemini API (Planned)                           |

---

## 📂 Project Structure

```text
AI-Guest-Feedback/
│
├── frontend/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── data/
│   ├── server.js
│   └── .env.example
│
└── README.md
```

---

## 🚀 How to Run Backend Locally

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```env
PORT=YOUR_PORT
CLIENT_URL=YOUR_FRONTEND_URL
```

### 4. Start the backend server

```bash
npm start
```

Backend will run at:

```text
http://localhost:5000
```

---

## 🚀 How to Run Frontend Locally

### 1. Navigate to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | /api/reviews           | Get all reviews   |
| GET    | /api/reviews/:id       | Get single review |
| POST   | /api/reviews           | Create review     |
| PUT    | /api/reviews/:id       | Update review     |
| DELETE | /api/reviews/:id       | Delete review     |
| GET    | /api/reviews?q=keyword | Search reviews    |
| GET    | /api/reviews/stats     | Review statistics |

---

## 👨‍💻 Author

**Meenakshi Pandey**
**Intern ID:** 26100307
