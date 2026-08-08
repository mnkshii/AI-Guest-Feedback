#  AI Guest Feedback Analyzer

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://ai-guest-feedback.vercel.app)
[![Render](https://img.shields.io/badge/Deployed_on-Render-46e3b7?logo=render)](https://ai-guest-feedback.onrender.com)
[![OpenRouter](https://img.shields.io/badge/Powered_by-OpenRouter-FF6B6B?logo=openai)](https://openrouter.ai)

### AI Guest Feedback Analyzer is a full-stack web application that uses OpenRouter AI to analyze hotel guest reviews, identify sentiment and key themes, and generate professional management responses in real time.

## Live Deployment

- **Frontend:** https://ai-guest-feedback.vercel.app
- **Backend API:** https://ai-guest-feedback.onrender.com

The application is publicly accessible and all major features, including authentication, CRUD operations, and AI-powered review analysis, are deployed and working in production.

---

## Screenshots

**Home Page**
![Home Page](./frontend/src/assets/images/home.png)

**Dashboard**
![Dashboard](./frontend/src/assets/images/dashboard.png)

**AI Analysis**
![Analysis Page](./frontend/src/assets/images/analysis.png)

**Manage Reviews**
![Manage Review Page](./frontend/src/assets/images/manage.png)

---


## Known Limitations

- The backend is hosted on Render's free tier, so the first request after inactivity may take approximately 30–60 seconds while the service wakes up.
- AI responses depend on OpenRouter API availability and model availability.
- Google OAuth requires an active internet connection and valid Google account.
- Free-tier cloud services may have usage and performance limitations.
- AI-generated responses should be reviewed by hotel staff before being sent to guests.


---
##  Key Features

-  **AI-Powered Review Analysis**
  - Detects review sentiment (Positive, Neutral, Negative)
  - Extracts key themes from guest feedback
  - Generates professional management responses using OpenRouter AI

-  **Review Management**
  - Add, edit, delete, and view guest reviews
  - Search and organize review records
  - Automatic sentiment tagging
  - Upload and display review images
    
-  **Batch AI Processing**
  - Analyze multiple pending reviews with a single click
  - Real-time loading state and error handling

-  **Secure Authentication**
  - JWT-based authentication
  - Google OAuth login
  - Protected routes for authorized users

-  **Dashboard**
  - Review statistics
  - Sentiment overview
  - Average ratings
  - Quick insights into guest feedback

-  **Full-Stack Deployment**
  - Frontend deployed on Vercel
  - Backend deployed on Render
  - MongoDB Atlas cloud database
    
---
##  Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, Vite, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **AI / LLM** | OpenRouter API (`openai/gpt-4o-mini`) |
| **Auth** | JWT, Passport.js, Google OAuth 2.0 |
| **Image Storage** | Cloudinary |
| **Deployment** | Vercel, Render |

---

## Architecture

The application follows a client-server architecture:

                    ┌──────────────────────┐
                    │       React UI       │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Render         │
                    └──────┬───────┬───────┘
                           │       │
                  ┌────────┘       └─────────┐
                  ▼                          ▼
        ┌─────────────────┐        ┌─────────────────┐
        │  MongoDB Atlas  │        │  OpenRouter AI  │
        │ Review Database │        │  LLM Analysis   │
        └─────────────────┘        └─────────────────┘


The frontend communicates with the Express backend through REST APIs. The backend handles authentication, review CRUD operations, database communication, and AI requests.

---

## How the AI Feature Works

1.  The user clicks **"Generate AI Responses"** on the Manage Reviews page.
2.  The frontend sends a `POST` request to `/api/ai/analyze` with the review text.
3.  The backend uses the **OpenRouter SDK** to send a structured prompt to the LLM.
4. The AI returns a structured JSON response:

```json
{
  "sentiment": "Negative",
  "keyPoints": "Clean room, rude staff, cold breakfast",
  "response": "Thank you for your feedback..."
}
```
This structured response is displayed in the application, allowing hotel managers to quickly understand guest feedback and generate professional responses.

---

## Database Choice

This project uses **MongoDB Atlas** because guest reviews are document-based and MongoDB provides a flexible schema, making it ideal for storing review data with varying content.

---

## Database Schema

![Database Schema](./frontend/src/assets/images/Schema.png)

---

### Review Schema

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| _id | ObjectId | Unique review ID |
| user | ObjectId | Reference to User who created the review |
| guest | String | Guest name |
| date | String | Review date |
| rating | Number | Rating from 1 to 5 |
| comment | String | Guest feedback text |
| images | Array[String] | Uploaded hotel/review images |
| sentiment | String | Positive, Neutral, or Negative |
| summary | String | AI-generated review summary |
| aiResponse | String | AI-generated response for guest |
| aiStatus | String | Pending or Generated |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Last update timestamp |

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
| POST | /api/ai/analyze |	Analyze a review using AI |
| POST | /api/ai/generate-responses |	Generate AI responses for pending reviews |

---

## Project Structure

```
AI-Guest-Feedback/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── public/
├── images/
├── PROMPTS.md
└── README.md
```

---
## Environment Variables

Create a `.env` file inside the `backend` folder.

### Development

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENROUTER_API_KEY=your_open_router_key
```
---

### Production

Set the following environment variables in the **Render Dashboard**:

```env
CLIENT_URL=https://ai-guest-feedback.vercel.app
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENROUTER_API_KEY=your_open_router_key
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

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| AI Provider | OpenRouter |
| Image Storage | Cloudinary |

The frontend is deployed on **Vercel**, while the backend API is hosted on **Render**. Guest review data is stored in **MongoDB Atlas**, uploaded images are stored using **Cloudinary**, and AI-powered sentiment analysis and response generation are provided through the **OpenRouter API**.


---
## Future Enhancements

- Support multiple AI providers such as Gemini, Claude, and OpenAI
- Export AI analysis reports as PDF
- Email notifications for high-priority negative reviews
- Advanced dashboard analytics with interactive charts
- Role-based access control for Admin and Manager accounts
- Multi-language review analysis
- Automated review prioritization
  
---
## Credits & Acknowledgements

This project was developed as part of the TBI-GEU Internship Capstone.

Technologies and services used in the project include:

- React.js and Vite for frontend development
- Node.js and Express.js for backend development
- MongoDB Atlas for database management
- OpenRouter API for AI-powered review analysis
- Cloudinary for image storage
- Passport.js and Google OAuth 2.0 for authentication
- Vercel and Render for deployment

I also used AI-assisted development tools for debugging, code guidance, and improving the application during development.

---

## Project Status

Completed — Internship Capstone Project

The application is deployed and its major features, including authentication, review management, dashboard analytics, image uploads, and AI-powered review analysis, are available in the production environment.

---

## Author

**Meenakshi Pandey**

GitHub Repository: https://github.com/mnkshii/AI-Guest-Feedback


