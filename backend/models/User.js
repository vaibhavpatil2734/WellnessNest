const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  profileImage: { type: String, default: "" },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  gender: {
    type: String,
    enum: ["not selected", "male", "female", "other"],
    default: "not selected",
    set: (value) => (value ? value.toLowerCase() : "not selected"),
  },
  age: { type: Number, default: null },
  history: [historySchema],
});

module.exports = mongoose.model("User", userSchema);