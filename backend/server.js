require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session"); 
const passport = require("passport"); 
require("./config/passport");
const reviewRoutes = require('./routes/reviews');
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Error:", err.message);
});
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET || "session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/reviews', reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.get('/ping', (req, res) => res.json({ message: 'pong' }));

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});