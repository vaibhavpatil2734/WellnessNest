require('dotenv').config();  // Load environment variables

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Log the Mongo URI to verify it's being loaded correctly
 
    const MONGO_URI = 'mongodb+srv://vaibhavpatil:timetoflay123@cluster0.a5es5.mongodb.net/fitnessTracker?retryWrites=true&w=majority';
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

  } catch (error) {
    console.error(`Error in DB connection: ${error.message}`);
    process.exit(1);  // Exit process if connection fails
  }
};

module.exports = connectDB;
