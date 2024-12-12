const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const cors = require("cors"); // Add this line for CORS handling
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS Middleware - Set allowed origin
app.use(
  cors({                          
    origin: ['http://localhost:5173', 'https://wellnessnest.netlify.app'], // Use the correct frontend URL directly
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow common HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
