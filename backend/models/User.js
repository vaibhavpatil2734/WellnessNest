const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Timestamp for tracking changes
  height: Number, // Stores height change
  weight: Number, // Stores weight change
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  profileImage: { type: String, default: "" },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null,
    set: (value) => (value ? value.toLowerCase() : null), // Store gender in lowercase
  },
  age: { type: Number, default: null },
  history: [historySchema], // Store height & weight change history
});

module.exports = mongoose.model("User", userSchema);
