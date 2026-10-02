const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'CodeTrack API is running', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CodeTrack server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
