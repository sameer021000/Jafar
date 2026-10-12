require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDatabase = require('./Config/Database');
const adminAuthRoutes = require('./Routes/AdminAuthRoutes');
const errorHandler = require('./Middlewares/ErrorHandler');

const app = express();

// 1. Establish Database Connection (MongoDB Atlas)
connectDatabase();

// 2. Configure CORS for Local Development and Vercel Frontends
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : ['http://localhost:3000', 'https://jafaradmin.vercel.app'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: Access denied for origin ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Healthcheck Endpoint (useful for Render deployment and monitoring)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    Status: 'online',
    Timestamp: new Date().toISOString(),
    Service: 'Jafar Backend API',
  });
});

// 5. Mount Authentication Routes
app.use('/admin', adminAuthRoutes);

// 6. Global Error Handling Middleware (must be registered after routes)
app.use(errorHandler);

// 7. Bind and Listen on Configured Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Jafar Backend server running on port ${PORT}`);
});

module.exports = { app, server };